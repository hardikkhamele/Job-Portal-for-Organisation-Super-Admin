/**
 * Exports and downloads a PDF invoice for a given revenue/billing transaction.
 * @param {Object} transaction - The transaction data object
 */
export const exportInvoice = async (transaction) => {
  if (!transaction) return;

  let html2pdf;

  if (typeof window !== "undefined" && window.html2pdf) {
    html2pdf = window.html2pdf;
  } else {
    try {
      const module = await import("html2pdf.js");
      html2pdf = module.default || module;
    } catch (primaryError) {
      try {
        const module = await import("html2pdf.js/dist/html2pdf.js");
        html2pdf = module.default || module;
      } catch (fallbackError) {
        console.error("Failed to load html2pdf module:", primaryError, fallbackError);
        return;
      }
    }
  }

  if (!html2pdf || typeof html2pdf !== "function") {
    console.error("html2pdf is not a valid function after import", html2pdf);
    return;
  }

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

  const planCharges =
    transaction.planCharges !== undefined
      ? `₹ ${transaction.planCharges.toLocaleString("en-IN")}`
      : priceFormatted;

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

  const invoiceNumber =
    transaction.invoiceNo ||
    transaction.invoiceNumber ||
    transaction.invoiceId ||
    txnId;

  const transactionNumber = txnId;

  const customerName =
    transaction.customerName ||
    transaction.employerName ||
    transaction.companyName ||
    transaction.originalItem?.companyName ||
    "N/A";

  const customerCompany =
    transaction.customerCompany ||
    transaction.companyName ||
    transaction.employerName ||
    transaction.originalItem?.companyName ||
    "N/A";

  const customerMobile =
    transaction.mobile ||
    transaction.phone ||
    transaction.contactNumber ||
    transaction.originalItem?.mobile ||
    transaction.originalItem?.phone ||
    "N/A";

  const customerEmail =
    transaction.email ||
    transaction.companyEmail ||
    transaction.originalItem?.email ||
    "N/A";

  const customerCityState =
    transaction.cityState ||
    (transaction.city && transaction.state
      ? `${transaction.city}, ${transaction.state}`
      : transaction.city ||
        transaction.state ||
        transaction.originalItem?.city ||
        transaction.originalItem?.state ||
        "N/A");

  const logoUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/technokrate_logo.png`
      : "/technokrate_logo.png";

  const preloadLogo = async (src) => {
    if (!src) return false;
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  };

  const logoLoaded = await preloadLogo(logoUrl);
  const useLogo = logoLoaded ? logoUrl : null;

  const gstRate =
    transaction.gstRate ??
    transaction.gstPercent ??
    transaction.originalItem?.gstRate ??
    transaction.originalItem?.gstPercent ??
    "18%";

  const gstAmountRaw =
    transaction.gstAmount ??
    transaction.gst ??
    transaction.originalItem?.gstAmount ??
    transaction.originalItem?.gst ??
    0;

  const gstAmountFormatted =
    typeof gstAmountRaw === "number"
      ? `₹ ${gstAmountRaw.toLocaleString("en-IN")}`
      : `₹ ${gstAmountRaw}`;

  const gstRateDisplay =
    typeof gstRate === "number" ? `${gstRate}%` : gstRate;

  const subtotal = planCharges;

  const amountInWords = (() => {
    const numberToWords = (value) => {
      const ones = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
      ];
      const teens = [
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ];
      const tens = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];
      const scales = ["", "Thousand", "Lakh", "Crore"];

      const toWords = (num) => {
        if (num === 0) return "Zero";
        let words = [];

        const segmentToWords = (n) => {
          const parts = [];
          if (n >= 100) {
            parts.push(`${ones[Math.floor(n / 100)]} Hundred`);
            n = n % 100;
          }
          if (n >= 20) {
            parts.push(tens[Math.floor(n / 10)]);
            if (n % 10) {
              parts.push(ones[n % 10]);
            }
          } else if (n >= 10) {
            parts.push(teens[n - 10]);
          } else if (n > 0) {
            parts.push(ones[n]);
          }
          return parts.join(" ");
        };

        const segments = [];
        let remainder = num;
        segments.push(remainder % 1000);
        remainder = Math.floor(remainder / 1000);
        while (remainder > 0) {
          segments.push(remainder % 100);
          remainder = Math.floor(remainder / 100);
        }

        for (let i = 0; i < segments.length; i += 1) {
          const segment = segments[i];
          if (segment) {
            const segmentWords = segmentToWords(segment);
            if (segmentWords) {
              words.unshift(
                `${segmentWords}${scales[i] ? ` ${scales[i]}` : ""}`.trim()
              );
            }
          }
        }

        return words.join(" ");
      };

      const numericValue =
        typeof value === "number"
          ? value
          : parseFloat(String(value).replace(/[^0-9.-]+/g, "")) || 0;
      return `Indian Rupees ${toWords(Math.floor(Math.abs(numericValue)))} Only`;
    };

    return numberToWords(rawPrice);
  })();

  const element = document.createElement("div");
  element.style.padding = "16px";
  element.style.backgroundColor = "#ffffff";
  element.style.color = "#1f2937";
  element.style.fontFamily = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  element.innerHTML = `
    <div style="max-width: 780px; margin: 0 auto; padding: 24px; border: none; border-radius: 0; background: #ffffff;">
      <div style="border: 1px solid #4b5563; border-radius: 0; margin-bottom: 18px; background: #ffffff; box-sizing: border-box; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; margin: 0; background: #ffffff; table-layout: fixed;">
          <tr>
            <td style="vertical-align: middle; padding: 14px 16px;">
              <div style="font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
                <span style="color: #000000;">TECHNOKRATE </span><span style="color: #2563eb;">HIRE</span>
              </div>
              <div style="margin-top: 8px; color: #475569; font-size: 12px; line-height: 1.6;">
                123 Business Park, Sector 21, Nagpur, Maharashtra - 440015<br />
                support@technokratehire.com
              </div>
            </td>
            <td style="width: 260px; vertical-align: middle; padding: 14px 16px; text-align: right;">
              ${useLogo
                ? `<img src="${useLogo}" alt="Company Logo" style="max-width: 240px; max-height: 85px; width: auto; height: auto; object-fit: contain; display: inline-block; border: none; vertical-align: middle;" />`
                : `<div style="width: 240px; height: 80px; display: inline-flex; align-items: center; justify-content: center; color: #64748b; font-size: 12px;">Company Logo</div>`}
            </td>
          </tr>
        </table>
      </div>

      <div style="border: 1px solid #4b5563; border-radius: 0; padding: 7px 0 9px 0; margin-bottom: 22px; background: #f8fafc; text-align: center; box-sizing: border-box;">
        <div style="font-size: 15px; font-weight: 700; color: #0f172a; text-align: center; text-transform: uppercase; letter-spacing: 1px; line-height: 1; margin: 0; padding: 0;">TAX INVOICE</div>
      </div>

      <!-- BILLED TO BLOCK -->
      <div style="border: 1px solid #4b5563; border-radius: 0; margin-bottom: 16px; background: #ffffff;">
        <div style="background: #f1f5f9; padding: 6px 16px 9px; border-bottom: 1px solid #4b5563; text-align: left;">
          <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #1e293b; letter-spacing: 0.5px; display: inline-block; line-height: 1.2;">BILLED TO</span>
        </div>
        <div style="padding: 10px 16px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #0f172a;">
            <tr>
              <td style="width: 110px; text-align: left; padding: 5px 8px 5px 0; font-weight: 600; color: #334155; white-space: nowrap;">Company:</td>
              <td style="text-align: left; padding: 5px 8px; color: #0f172a;">${customerCompany}</td>
            </tr>
            <tr>
              <td style="width: 110px; text-align: left; padding: 5px 8px 5px 0; font-weight: 600; color: #334155; white-space: nowrap;">Email:</td>
              <td style="text-align: left; padding: 5px 8px; color: #0f172a; word-break: break-all;">${customerEmail}</td>
            </tr>
            <tr>
              <td style="width: 110px; text-align: left; padding: 5px 8px 5px 0; font-weight: 600; color: #334155; white-space: nowrap;">City/State:</td>
              <td style="text-align: left; padding: 5px 8px; color: #0f172a;">${customerCityState}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- INVOICE DETAILS BLOCK -->
      <div style="border: 1px solid #4b5563; border-radius: 0; margin-bottom: 22px; background: #ffffff;">
        <div style="background: #f1f5f9; padding: 6px 16px 9px; border-bottom: 1px solid #4b5563; text-align: left;">
          <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #1e293b; letter-spacing: 0.5px; display: inline-block; line-height: 1.2;">INVOICE DETAILS</span>
        </div>
        <div style="padding: 10px 16px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #0f172a;">
            <tr>
              <td style="width: 130px; text-align: left; padding: 5px 8px 5px 0; font-weight: 600; color: #334155; white-space: nowrap;">Invoice No.:</td>
              <td style="text-align: left; padding: 5px 8px; color: #0f172a;">${invoiceNumber}</td>
            </tr>
            <tr>
              <td style="width: 130px; text-align: left; padding: 5px 8px 5px 0; font-weight: 600; color: #334155; white-space: nowrap;">Transaction ID:</td>
              <td style="text-align: left; padding: 5px 8px; color: #0f172a;">${transactionNumber}</td>
            </tr>
            <tr>
              <td style="width: 130px; text-align: left; padding: 5px 8px 5px 0; font-weight: 600; color: #334155; white-space: nowrap;">Payment Date:</td>
              <td style="text-align: left; padding: 5px 8px; color: #0f172a;">${dateStr}</td>
            </tr>
            <tr>
              <td style="width: 130px; text-align: left; padding: 5px 8px 5px 0; font-weight: 600; color: #334155; white-space: nowrap;">Payment Status:</td>
              <td style="text-align: left; padding: 5px 8px; color: #0f172a;">${paymentStatus}</td>
            </tr>
            <tr>
              <td style="width: 130px; text-align: left; padding: 5px 8px 5px 0; font-weight: 600; color: #334155; white-space: nowrap;">Payment Method:</td>
              <td style="text-align: left; padding: 5px 8px; color: #0f172a;">${paymentMethod}</td>
            </tr>
          </table>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
        <thead>
          <tr style="background-color: #102a43; color: #ffffff;">
            <th style="padding: 12px 10px; text-align: left; font-size: 12px; font-weight: 700; border: 1px solid #4b5563;">Sr</th>
            <th style="padding: 12px 10px; text-align: left; font-size: 12px; font-weight: 700; border: 1px solid #4b5563;">Package / Plan</th>
            <th style="padding: 12px 10px; text-align: right; font-size: 12px; font-weight: 700; border: 1px solid #4b5563;">Price (INR)</th>
            <th style="padding: 12px 10px; text-align: right; font-size: 12px; font-weight: 700; border: 1px solid #4b5563;">GST Rate</th>
            <th style="padding: 12px 10px; text-align: right; font-size: 12px; font-weight: 700; border: 1px solid #4b5563;">Total (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 14px 10px; border: 1px solid #4b5563; font-size: 13px; color: #0f172a;">1</td>
            <td style="padding: 14px 10px; border: 1px solid #4b5563; font-size: 13px; color: #0f172a;">${planName}</td>
            <td style="padding: 14px 10px; border: 1px solid #4b5563; font-size: 13px; color: #0f172a; text-align: right;">${planCharges}</td>
            <td style="padding: 14px 10px; border: 1px solid #4b5563; font-size: 13px; color: #0f172a; text-align: right;">${gstRateDisplay}</td>
            <td style="padding: 14px 10px; border: 1px solid #4b5563; font-size: 13px; color: #0f172a; text-align: right;">${priceFormatted}</td>
          </tr>
        </tbody>
      </table>

      <table style="width: 100%; border-collapse: collapse; table-layout: fixed; margin-bottom: 22px;">
        <tr>
          <td style="width: 50%; padding-right: 10px; vertical-align: top;">
            <div style="border: 1px solid #4b5563; border-radius: 0; background: #ffffff; min-height: 150px; width: 100%; box-sizing: border-box; display: flex; flex-direction: column;">
              <div style="background: #f1f5f9; padding: 8px 12px; border-bottom: 1px solid #4b5563; text-align: center;">
                <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #1e293b; letter-spacing: 0.5px;">Amount in Words</span>
              </div>
              <div style="padding: 12px; font-size: 13px; color: #0f172a; line-height: 1.6; flex: 1;">${amountInWords}</div>
            </div>
          </td>
          <td style="width: 50%; padding-left: 10px; vertical-align: top;">
            <div style="border: 1px solid #4b5563; border-radius: 0; background: #ffffff; min-height: 150px; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="padding: 12px 12px 0;">
                <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #1e293b;">
                  <span>Subtotal (Plan Charges):</span>
                  <span>${subtotal}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #1e293b;">
                  <span>GST Amount (${gstRateDisplay}):</span>
                  <span>${gstAmountFormatted}</span>
                </div>
              </div>
              <div style="border-top: 1px solid #4b5563; padding: 10px 12px 12px; display: flex; justify-content: space-between; font-size: 14px; font-weight: 700; color: #ea580c;">
                <span>Net Total Amount Paid:</span>
                <span>${priceFormatted}</span>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <div style="margin-top: 28px; padding-top: 14px; border-top: 1px solid #4b5563; text-align: center; font-size: 11px; color: #64748b;">
        Thank you for your business with Technokrate Hire. This is an electronically generated invoice and does not require a signature.
      </div>
    </div>
  `;

  const options = {
    margin: 8,
    filename: `Invoice_${txnId}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 1.4, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  const wrapper = document.createElement("div");
  wrapper.style.position = "absolute";
  wrapper.style.left = "-9999px";
  wrapper.style.top = "-9999px";
  wrapper.appendChild(element);
  document.body.appendChild(wrapper);

  return html2pdf()
    .set(options)
    .from(element)
    .save()
    .catch((error) => {
      console.error("Invoice export failed:", error);
    })
    .finally(() => {
      if (wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
    });
};
