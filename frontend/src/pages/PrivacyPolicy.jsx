import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 mb-4">
                Welcome to Restoo ("we," "our," or "us"). We are committed to
                protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                use our food delivery platform and services.
              </p>
              <p className="text-gray-700">
                By using our services, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                2.1 Personal Information
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Delivery address and location data</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Account credentials and profile information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                2.2 Usage Information
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Order history and preferences</li>
                <li>Restaurant ratings and reviews</li>
                <li>App usage patterns and interactions</li>
                <li>Device information and IP addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Process and fulfill your food delivery orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send order confirmations and delivery updates</li>
                <li>Personalize your experience and recommend restaurants</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Restaurant Partners:</strong> Share order details with
                  restaurants to fulfill your orders
                </li>
                <li>
                  <strong>Delivery Partners:</strong> Provide delivery
                  information to ensure timely delivery
                </li>
                <li>
                  <strong>Service Providers:</strong> Work with trusted third
                  parties for payment processing, analytics, and support
                </li>
                <li>
                  <strong>Legal Requirements:</strong> Comply with applicable
                  laws, regulations, or legal processes
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. These measures
                include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Your Rights and Choices
              </h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Correction:</strong> Update or correct inaccurate
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  data (subject to legal requirements)
                </li>
                <li>
                  <strong>Portability:</strong> Receive your data in a
                  machine-readable format
                </li>
                <li>
                  <strong>Opt-out:</strong> Unsubscribe from marketing
                  communications
                </li>
                <li>
                  <strong>Restriction:</strong> Limit how we process your data
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your
                experience, analyze usage patterns, and provide personalized
                content. You can control cookie settings through your browser
                preferences, though disabling certain cookies may affect
                functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under 13 years of
                age. We do not knowingly collect personal information from
                children under 13. If you believe we have collected such
                information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place to protect your data in accordance with this
                Privacy Policy and applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the "Last updated" date. Your continued
                use of our services after such changes constitutes acceptance of
                the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@restoo.com
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> 123 Food Street, Delivery City, DC
                  12345, United States
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
