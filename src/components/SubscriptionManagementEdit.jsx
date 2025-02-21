import { Plus, Pencil, Trash } from "lucide-react";

import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import SubscriptionPlans from "./SubscriptionPlan";

export default function SubscriptionManagementEdit() {
  return (
    <div className="flex h-screen max-w-full">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex flex-col w-full bg-gray-100 h-screen overflow-auto">
        {/* Header */}

        {/* Content */}
        <main className="flex-1 px-5">
          {/* Edit Subscriptions */}
          <section className="bg-gray-100 rounded-lg">
            <div className="flex gap-5 mt-10">
              <Link to="/">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-purple-600"
                />
              </Link>
              <div className="text-xl font-semibold mb-4 flex justify-between w-full">
                Edit Subscriptions
                <button className="flex items-center text-sm px-2 rounded-lg">
                  <Plus className="w-5 h-5 mr-2" /> Add New Subscription
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-lg w-full bg-white">
              {/* Input Fields Section */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Basic Plan"
                    className="border border-gray-300 p-3 rounded-lg w-full text-gray-700 bg-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="₹ 99"
                    className="border border-gray-300 p-3 rounded-lg w-full text-gray-700 bg-gray-100"
                  />
                  <div className="flex items-center space-x-2 w-full">
                    <input
                      type="text"
                      placeholder="#804706"
                      className="border border-gray-300 p-3 rounded-lg w-full text-gray-700 bg-gray-100"
                    />
                  </div>
                </div>
                <div className="border border-gray-300 p-3 rounded-lg w-full text-gray-700 bg-gray-100">
                  <span>
                    Access a limited pool of job postings and candidate profiles
                    with essential hiring tools.
                  </span>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex flex-col space-y-4">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Save
                </button>
                <button className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold">
                  Cancel
                </button>
              </div>
            </div>
          </section>

          {/* Manage Subscriptions */}
          <section className="mt-6 bg-white px-5 rounded-xl">
            <div className="flex justify-between items-center mb-4"></div>

            {/* Subscription Plans */}
            <SubscriptionPlans />
          </section>
        </main>

        {/* Footer */}
        <div className="bg-white px-5 py-2 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
