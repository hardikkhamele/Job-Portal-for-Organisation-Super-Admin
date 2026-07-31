import html2pdf from "html2pdf.js";

/**
 * Exports and downloads a PDF invoice for a given revenue/billing transaction.
 * @param {Object} transaction - The transaction data object
 */
export const exportInvoice = (transaction) => {
  if (!transaction) return;

  const txnId =
    transaction.transactionId ||
    transaction.id ||
    transaction._id ||
    "N/A";

  const employerName =
    transaction.employerName ||
    transaction.companyName ||
    transaction.originalItem?.companyName ||
    "N/A";

  const industry = transaction.companyIndustry || "N/A";

  const planName =
    transaction.planDetails ||
    transaction.planDescription ||
    transaction.plan ||
    "Subscription Plan";

  const rawPrice =
    transaction.price ??
    transaction.totalAmountPaid ??
    transaction.planCharges ??
    0;

  const priceFormatted =
    typeof rawPrice === "number"
      ? `₹ ${rawPrice.toLocaleString("en-IN")}`
      : `₹ ${rawPrice}`;

  const paymentStatus = (
    transaction.status ||
    transaction.paymentStatus ||
    "success"
  ).toUpperCase();

  const paymentMethod = transaction.paymentMethod || "Online Payment";

  const dateStr = transaction.paymentDateTime
    ? new Date(transaction.paymentDateTime).toLocaleString("en-IN")
    : transaction.createdAt
    ? new Date(transaction.createdAt).toLocaleString("en-IN")
    : new Date().toLocaleDateString("en-IN");

  const gstin =
    transaction.gstin || transaction.originalItem?.gstin || "N/A";

  const planCharges =
    transaction.planCharges !== undefined
      ? `₹ ${transaction.planCharges.toLocaleString("en-IN")}`
      : priceFormatted;

  const discount =
    transaction.discount !== undefined ? `${transaction.discount}%` : "0%";

  // Create temporary HTML element for PDF generation
  const element = document.createElement("div");
  element.style.padding = "20px";
  element.style.backgroundColor = "#ffffff";
  element.style.color = "#1f2937";
  element.style.fontFamily = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  element.innerHTML = `
    <div style="max-width: 750px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #7c3aed; padding-bottom: 16px; margin-bottom: 24px;">
        <div>
          <div style="font-size: 26px; font-weight: 800; color: #7c3aed; letter-spacing: -0.5px;">TECH NOHIRE</div>
          <div style="margin-top: 4px; color: #6b7280; font-size: 12px; font-weight: 500;">Super Admin Revenue Invoice</div>
        </div>
        <div style="text-align: right;">
          <h1 style="margin: 0; font-size: 22px; color: #111827; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">TAX INVOICE</h1>
          <p style="margin: 6px 0 0; color: #4b5563; font-size: 12px;"><strong>Invoice No:</strong> ${txnId}</p>
          <p style="margin: 2px 0 0; color: #4b5563; font-size: 12px;"><strong>Date:</strong> ${dateStr}</p>
        </div>
      </div>

      <!-- Info Section -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 13px;">
        <div style="flex: 1; padding-right: 16px;">
          <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin: 0 0 8px 0; letter-spacing: 0.5px;">Billed To</h3>
          <p style="margin: 2px 0; font-weight: 700; font-size: 15px; color: #111827;">${employerName}</p>
          ${industry !== "N/A" ? `<p style="margin: 2px 0; color: #4b5563;">Industry: ${industry}</p>` : ""}
          ${gstin !== "N/A" ? `<p style="margin: 2px 0; color: #4b5563;">GSTIN: ${gstin}</p>` : ""}
        </div>
        <div style="text-align: right; flex: 1; padding-left: 16px;">
          <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin: 0 0 8px 0; letter-spacing: 0.5px;">Payment Details</h3>
          <p style="margin: 2px 0; color: #111827;"><strong>Payment Method:</strong> <span style="text-transform: capitalize;">${paymentMethod}</span></p>
          <p style="margin: 2px 0; color: #111827;"><strong>Transaction ID:</strong> ${txnId}</p>
          <div style="margin-top: 8px;">
            <span style="display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; ${
              paymentStatus === "SUCCESS" || paymentStatus === "SUCCESSFUL"
                ? "background-color: #dcfce7; color: #15803d;"
                : "background-color: #fee2e2; color: #b91c1c;"
            }">
              ${paymentStatus}
            </span>
          </div>
        </div>
      </div>

      <!-- Line Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr style="background-color: #f9fafb;">
            <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #374151; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Description</th>
            <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #374151; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Plan Charges</th>
            <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #374151; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Discount</th>
            <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #374151; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Total Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 14px 12px; font-size: 13px; color: #111827; border-bottom: 1px solid #f3f4f6;">
              <strong style="font-size: 14px;">${planName}</strong>
              <div style="font-size: 11px; color: #6b7280; margin-top: 3px;">Employer Subscription Plan</div>
            </td>
            <td style="padding: 14px 12px; font-size: 13px; color: #4b5563; text-align: right; border-bottom: 1px solid #f3f4f6;">${planCharges}</td>
            <td style="padding: 14px 12px; font-size: 13px; color: #4b5563; text-align: right; border-bottom: 1px solid #f3f4f6;">${discount}</td>
            <td style="padding: 14px 12px; font-size: 13px; color: #15803d; font-weight: 700; text-align: right; border-bottom: 1px solid #f3f4f6;">${priceFormatted}</td>
          </tr>
        </tbody>
      </table>

      <!-- Summary Section -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 24px;">
        <div style="width: 260px;">
          <div style="display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; color: #4b5563;">
            <span>Subtotal:</span>
            <span>${planCharges}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; color: #4b5563;">
            <span>Discount:</span>
            <span>${discount}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 16px; font-weight: 700; color: #15803d; border-top: 2px solid #e5e7eb; margin-top: 6px;">
            <span>Total Paid:</span>
            <span>${priceFormatted}</span>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #9ca3af;">
        Thank you for choosing TechnoHire. This is a computer-generated invoice and requires no physical signature.
      </div>
    </div>
  `;

  const options = {
    margin: 10,
    filename: `Invoice_${txnId}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
};
