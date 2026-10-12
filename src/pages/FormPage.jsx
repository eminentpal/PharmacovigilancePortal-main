import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";
import PatientReactionSection from "../components/form-sections/PatientReactionSection";
import CoAdministratingSection from "../components/form-sections/CoAdministratingSection";
import CaseReportSection from "../components/form-sections/CaseReportSection";
import { useReportForm } from "../hooks/useReportForm";
import { submitAdverseReaction } from "../services/api";
import CharacterizationOfDrugRoleSection from "../components/form-sections/CharacterizationOfDrugRoleSection";

export default function FormPage() {
  const { data, errors, change, toggle, validate, reset } = useReportForm();
  const [notice, setNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setNotice(null);

    if (!validate()) {
      setNotice({
        kind: "error",
        title: "Please complete the required information.",
        text: "Check the highlighted fields and try again.",
      });
      document
        .querySelector(
          ".has-error input, .has-error textarea, .has-error select",
        )
        ?.focus();
      return;
    }

    setSubmitting(true);

    try {
      await submitAdverseReaction({
        patient: {
          initials: data.patientInitials,
          dateOfBirth: data.dateOfBirth,
          sex: data.sex,
          ageAtOnset: data.ageAtOnset,
          email: data.email,
          phoneNumber: data.phoneNumber,
          typeofcustomer: data.typeofcustomer,
        },
        reaction: {
          startDate: data.reactionStartDate,
          description: data.reactionDescription,
          outcome: data.reactionOutcome,
          actionTaken:
            data.actionTaken === "Others"
              ? data.actionTakenOther
              : data.actionTaken,
          labResults: data.labResults,
          seriousnessCriteria: data.seriousness,
        },
        suspectedDrug: {
          nameAndGeneric: data.suspectedDrugName,
          batchNumber: data.batchNumber,
          manufactureExpiryDate: data.manufactureExpiryDate,
          dailyDose: data.dailyDose,
          routeOfAdministration: data.routeOfAdministration,
          routeOfAdministrationOther: data.routeOfAdministrationOther,
          indication: data.indication,
          startDate: data.drugStartDate,
          lastAdministrationDate: data.lastAdministrationDate,
          reAdministeredDate: data.reAdministeredDate,
          reAdministered: data.reAdministered,
          reactionOnReadministration: data.rechallenge,
        },
        concomitantDrug: {
          usedOtherDrug: data.usedOtherDrug,
          nameAndGeneric: data.concomitantDrugName,
          startDate: data.concomitantStartDate,
          lastAdministrationDate: data.concomitantLastAdministration,
        },
        report: {
          medicalHistory: data.medicalHistory,
          medicalHistoryOther:
            data.medicalHistory === "Other" ? data.medicalHistoryOther : "",
          caseSource: data.caseSource,
          reporterName: data.reporterName,
          previousCaseIdentifiers: data.previousCaseIdentifiers,
          recentInformationDate: data.recentInformationDate,
          types: data.reportTypes,
        },
      });

      setNotice({
        kind: "success",
        title: "Success! Your form has been submitted.",
        text: "The adverse reaction report has been received for review.",
      });
    } catch {
      setNotice({
        kind: "error",
        title: "Something went wrong.",
        text: "Your form could not be submitted. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="form-page">
        <div className="form-intro">
          <Link to="/" className="back-link">
            ← Back to home
          </Link>
          <p className="eyebrow">ADVERSE REACTION REPORT</p>
          <h1>Suspected adverse reaction form</h1>
          <p>
            Fields marked with <span className="required">*</span> are required
            to submit a report.
          </p>
        </div>

        <form onSubmit={submit} noValidate>
          <PatientReactionSection
            data={data}
            errors={errors}
            onChange={change}
            onToggle={toggle}
          />
          <CharacterizationOfDrugRoleSection
            data={data}
            errors={errors}
            onChange={change}
          />
          <CoAdministratingSection
            data={data}
            errors={errors}
            onChange={change}
          />
          <CaseReportSection data={data} onChange={change} onToggle={toggle} />

          <div className="submit-row">
            <p>
              By submitting, you confirm the information is accurate to the best
              of your knowledge.
            </p>
            <button
              className="button button-primary"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Submitting report…" : "Submit report"}{" "}
              <span>→</span>
            </button>
          </div>

          {notice && (
            <Alert
              kind={notice.kind}
              title={notice.title}
              onDismiss={() => setNotice(null)}
            >
              {notice.text}
              {notice.kind === "success" && (
                <button
                  className="alert-link"
                  onClick={() => {
                    reset();
                    setNotice(null);
                  }}
                >
                  Start a new report
                </button>
              )}
            </Alert>
          )}
        </form>
      </main>
    </>
  );
}
