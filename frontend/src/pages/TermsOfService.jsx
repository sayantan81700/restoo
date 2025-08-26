import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Restoo's food delivery platform and
                services, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the
                above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-700 mb-4">
                Restoo is a food delivery platform that connects customers with
                local restaurants and delivery partners. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Online food ordering and delivery</li>
                <li>Restaurant discovery and menu browsing</li>
                <li>Order tracking and status updates</li>
                <li>Payment processing and billing</li>
                <li>Customer support and dispute resolution</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. User Accounts and Registration
              </h2>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                3.1 Account Creation
              </h3>
              <p className="text-gray-700 mb-4">
                To use certain features of our service, you must create an
                account. You agree to provide accurate, current, and complete
                information during registration and to update such information
                to keep it accurate, current, and complete.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                3.2 Account Security
              </h3>
              <p className="text-gray-700 mb-4">
                You are responsible for safeguarding your account credentials
                and for all activities that occur under your account. You agree
                to notify us immediately of any unauthorized use of your
                account.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                3.3 Account Termination
              </h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate or suspend your account at any
                time for violations of these terms or for any other reason at
                our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Ordering and Payment
              </h2>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                4.1 Order Placement
              </h3>
              <p className="text-gray-700 mb-4">
                When you place an order through our platform, you agree to pay
                the total amount shown, including applicable taxes, delivery
                fees, and service charges. All orders are subject to acceptance
                by the restaurant and availability of items.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                4.2 Payment Methods
              </h3>
              <p className="text-gray-700 mb-4">
                We accept various payment methods including credit cards, debit
                cards, and digital wallets. Payment is processed securely
                through our third-party payment processors. You authorize us to
                charge your selected payment method for all amounts due.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                4.3 Pricing and Fees
              </h3>
              <p className="text-gray-700 mb-4">
                Prices are set by restaurants and may vary. We may charge
                additional fees for delivery, service, or other costs. All fees
                will be clearly displayed before you complete your order.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Delivery and Service
              </h2>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                5.1 Delivery Times
              </h3>
              <p className="text-gray-700 mb-4">
                Estimated delivery times are provided for reference only and may
                vary based on factors such as restaurant preparation time,
                traffic conditions, and delivery partner availability.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                5.2 Delivery Areas
              </h3>
              <p className="text-gray-700 mb-4">
                Delivery is available within specified service areas. We reserve
                the right to modify delivery areas or refuse delivery to certain
                locations at our discretion.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                5.3 Order Issues
              </h3>
              <p className="text-gray-700 mb-4">
                If you experience issues with your order, please contact our
                customer support within 30 minutes of delivery. We will work to
                resolve issues promptly and fairly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. User Conduct and Prohibited Activities
              </h2>
              <p className="text-gray-700 mb-4">
                You agree not to engage in any of the following prohibited
                activities:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Violating any applicable laws or regulations</li>
                <li>Impersonating another person or entity</li>
                <li>Interfering with or disrupting our services</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Harassing, threatening, or abusing other users or staff</li>
                <li>Submitting false or misleading information</li>
                <li>
                  Using our services for any illegal or unauthorized purpose
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-gray-700 mb-4">
                Our platform, including its content, features, and
                functionality, is owned by Restoo and is protected by copyright,
                trademark, and other intellectual property laws. You may not
                copy, modify, distribute, or create derivative works without our
                express written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of your
                personal information is governed by our Privacy Policy, which is
                incorporated into these Terms of Service by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Disclaimers and Limitations of Liability
              </h2>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                9.1 Service Availability
              </h3>
              <p className="text-gray-700 mb-4">
                We strive to provide reliable service but cannot guarantee
                uninterrupted access. Our services are provided "as is" without
                warranties of any kind.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                9.2 Third-Party Services
              </h3>
              <p className="text-gray-700 mb-4">
                We work with restaurants and delivery partners who are
                independent third parties. We are not responsible for their
                actions, food quality, or delivery performance.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">
                9.3 Limitation of Liability
              </h3>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Restoo shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Indemnification
              </h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless Restoo, its officers,
                directors, employees, and agents from any claims, damages,
                losses, or expenses arising from your use of our services or
                violation of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Dispute Resolution
              </h2>
              <p className="text-gray-700 mb-4">
                Any disputes arising from these terms or your use of our
                services shall be resolved through binding arbitration in
                accordance with the rules of the American Arbitration
                Association. You waive any right to a jury trial or class action
                lawsuit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                12. Governing Law
              </h2>
              <p className="text-gray-700 mb-4">
                These Terms of Service shall be governed by and construed in
                accordance with the laws of the state where Restoo is
                incorporated, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                13. Changes to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will
                notify users of material changes by posting the updated terms on
                our platform. Your continued use of our services after such
                changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                14. Severability
              </h2>
              <p className="text-gray-700 mb-4">
                If any provision of these terms is found to be unenforceable or
                invalid, that provision will be limited or eliminated to the
                minimum extent necessary so that these terms will otherwise
                remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                15. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@restoo.com
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

export default TermsOfService;
