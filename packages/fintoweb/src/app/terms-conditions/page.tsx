import React from "react";
import "./TermsConditions.css";

const page = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;

  return (
    <React.Fragment>
      <div className="privacy-policy-header">
        <div className="privacy-policy-content">
          <h1>Terms of Use</h1>
          <p className="mt-3">Effective Date: {formattedDate}</p>
          <p className="mt-3">
            Welcome to Fintopedia! These Terms of Use ("Terms") govern your
            access to and use of our website and services, including the courses
            and educational content hosted on our platform ("Services"). By
            accessing or using our Services, you agree to these Terms. If you do
            not agree, do not use the Services.
          </p>
          <h2 className="mt-5">1. Eligibility</h2>
          <p>
            You must be at least 18 years old, or the age of majority in your
            jurisdiction, to use our Services. By using our platform, you
            represent and warrant that you meet this eligibility requirement.
          </p>
          <h2 className="mt-5">2. User Accounts</h2>
          <h2>2.1 Account Creation</h2>
          <p>
            To access certain features of the Services, you may need to create
            an account. You agree to provide accurate, complete, and updated
            information and to keep your login credentials secure.
          </p>
          <h2>2.2 Account Responsibility</h2>
          <p>
            You are responsible for all activity that occurs under your account.
            Notify us immediately of any unauthorized use or security breach.
          </p>
          <h2 className="mt-5">3. Use of Services</h2>
          <h2>3.1 License to Use</h2>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to
            access and use our Services solely for personal, non-commercial
            purposes, in accordance with these Terms.
          </p>
          <h2>3.2 Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li> Share course content outside the platform.</li>
            <li> Reverse-engineer, copy, or reproduce our content.</li>
            <li> Use the platform for any unlawful or unauthorized purpose.</li>
          </ul>
          <h2 className="mt-5">4. Intellectual Property</h2>
          <p>
            All content, including courses, videos, text, graphics, logos, and
            software, is owned by or licensed to Fintopedia and protected under
            applicable copyright, trademark, and other intellectual property
            laws. Unauthorized use of any content is strictly prohibited.
          </p>
          <h2 className="mt-5">5. Payments and Refunds Fees</h2>
          <p>
            Fees for courses and other Services are listed on our website.
            Payments must be made in advance and are non-refundable unless
            explicitly stated otherwise.
          </p>
          <h2 className="mt-5">6. Third-Party Tools and Links</h2>
          <p>
            Our platform may include tools or links to third-party websites. We
            are not responsible for the content, functionality, or policies of
            these third parties. Use them at your own risk.
          </p>
          <h2 className="mt-5">7. Disclaimer of Warranties</h2>
          <p>
            Our Services are provided "as is" and "as available." We make no
            warranties, express or implied, regarding the accuracy, reliability,
            or availability of the Services.
          </p>
          <h2 className="mt-5">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Fintopedia and its
            affiliates shall not be liable for any indirect, incidental,
            consequential, or punitive damages, including but not limited to
            loss of data, profits, or other intangible losses, arising from your
            use of the Services. Our total liability for any claims arising out
            of or related to these Terms or the Services will not exceed the
            amount you paid us in the 12 months preceding the event giving rise
            to the claim.
          </p>

          <h2 className="mt-5">9. Accessibility</h2>
          <p>
            We are committed to providing an accessible and user-friendly
            platform. If you encounter any accessibility barriers while using
            our Services, please contact us at [Contact Email], and we will make
            reasonable efforts to address your concerns and improve your
            experience.
          </p>
          <h2 className="mt-5">10. Spam and Virus Protection Policy</h2>
          <p>
            We take reasonable measures to protect our platform and users from
            spam and malicious software. However, we cannot guarantee that our
            platform will be free from viruses or other harmful components. It
            is your responsibility to use up-to-date antivirus software and
            exercise caution when interacting with any content on our platform
            or external links.
          </p>
          <h2 className="mt-5">11. Data Tracking and Storage</h2>
          <p>
            We reserve the right to track and observe user actions on our
            platform, including login activities, course interactions, and
            browsing behavior, to improve our Services and enhance user
            experience. Additionally, we collect and store user email addresses
            and phone numbers for communication, account management, and service
            updates. Your information will be handled in accordance with our
            Privacy Policy.
          </p>
          <h2 className="mt-5">12. Important Disclaimers</h2>
          <p>
            Our courses are provided for educational purposes only and are not
            intended as investment or trading advice. The content of the courses
            does not constitute a recommendation or endorsement of any specific
            stocks, securities, or investment strategies. Fintopedia and its
            instructors are not SEBI-registered advisors. For financial advice,
            consult a qualified and licensed professional.
          </p>
          <h2 className="mt-5">13. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the
            Services at any time, without notice, for any violation of these
            Terms or other policies.
          </p>
          <h2 className="mt-5">14. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of Mumbai. Any disputes shall be subject to the exclusive
            jurisdiction of the courts located in Mumbai.
          </p>
          <h2 className="mt-5">15. Changes to the Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Services after changes are posted constitutes your acceptance of the
            updated Terms.
          </p>
          <h2 className="mt-5">16. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms, contact us
            at +91 7400419869 , reachus@fintopedia.com.
          </p>
          <h2 className="mt-5">By accessing or using the Services, you acknowledge that you have read, understood, and agreed to these Terms of Use.</h2>
         
        </div>
      </div>
    </React.Fragment>
  );
};

export default page;
