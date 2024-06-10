import Link from "next/link";
import React from "react";
import { ArrowLeft } from "react-feather";

const TermsPage = () => {
  return (
    <main className="min-h-screen w-screen py-[65px]">
      <div className="mx-auto px-4 transition-all tablet-md:max-w-[1320px] tablet-md:px-12">
        <Link className="btn btn-ghost whitespace-nowrap" href={"/"}>
          <ArrowLeft /> BACK
        </Link>
        <h1 className="pb-6 text-4xl font-extrabold  tracking-tight">
          Terms and Conditions
        </h1>
        <div>
          1. Introduction
          <br />
          By using tuniko.info you confirm your acceptance of, and agree to be
          bound by, these terms and conditions.
          <br />
          <br />
          2. Agreement to Terms and Conditions
          <br />
          This Agreement takes effect on the date on which you first use the
          tuniko.info application.
          <br />
          <br />
          3. License Duration
          <br />
          This license is perpetual, with the exception of you breaking any part
          of this license, in which case you lose all rights under the license.
          <br />
          <br />
          4. Product usage
          <br />
          By using tuniko.info, you agree to receive important product updates
          from tuniko.info via the email linked with your Google account,
          Linkedin account or the email you used to register your account. We
          only send important product updates.
          <br />
          <br />
          5. Disclaimer
          <br />
          It is not warranted that tuniko.info will meet your requirements or
          that its operation will be uninterrupted or error free. All express
          and implied warranties or conditions not stated in this Agreement
          (including without limitation, loss of profits, loss or corruption of
          data, business interruption or loss of contracts), so far as such
          exclusion or disclaimer is permitted under the applicable law are
          excluded and expressly disclaimed. This Agreement does not affect your
          statutory rights.
          <br />
          <br />
          6. Warranties and Limitation of Liability
          <br />
          Tuniko.info does not give any warranty, guarantee or other term as to
          the quality, fitness for purpose or otherwise of the
          software.tuniko.info shall not be liable to you by reason of any
          representation (unless fraudulent), or any implied warranty, condition
          or other term, or any duty at common law, for any loss of profit or
          any indirect, special or consequential loss, damage, costs, expenses
          or other claims (whether caused by tuniko.info&apos;s negligence or
          the negligence of its servants or agents or otherwise) which arise out
          of or in connection with the provision of any goods or services
          bytuniko.info. tuniko.info shall not be liable or deemed to be in
          breach of contract by reason of any delay in performing, or failure to
          perform, any of its obligations if the delay or failure was due to any
          cause beyond its reasonable control. Notwithstanding contrary clauses
          in this Agreement, in the event that tuniko.info are deemed liable to
          you for breach of this Agreement, you agree thattuniko.info&apos;s
          liability is limited to the amount actually paid by you for your
          services or software, which amount calculated in reliance upon this
          clause. You hereby release tuniko.info from any and all obligations,
          liabilities and claims in excess of this limitation.
          <br />
          <br />
          7. Responsibilities
          <br />
          Tuniko.info is not responsible for what the user does with the
          user-generated content.
          <br />
          <br />
          8. General Terms and Law
          <br />
          This Agreement is governed by the laws of France. You acknowledge that
          no joint venture, partnership, employment, or agency relationship
          exists between you and tuniko.info as a result of your use of these
          services. You agree not to hold yourself out as a representative,
          agent or employee of tuniko.info. You agree that tuniko.info will not
          be liable by reason of any representation, act or omission to act by
          you.
          <br />
          <br />
          Last updated: 1 July 2024.
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
