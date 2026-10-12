import CheckGroup from "../CheckGroup";
import FormField from "../FormField";
import FormSection from "../FormSection";
import { reportOptions } from "../../constants/formOptions";

export default function CaseReportSection({ data, onChange, onToggle }) {
  const isSalesRep = data.typeofcustomer === "Sales Rep";

  return (
    <FormSection title="Case and report information">
      <FormField
        label="Relevant medical history and concurrent conditions"
        name="medicalHistory"
        type="select"
        value={data.medicalHistory}
        onChange={onChange}
        options={["Hypertension", "Kidney", "Diabetes", "Other"]}
        // error = {errors.medicalHistory}
      />

      {data.medicalHistory === "Other" && (
        <FormField
          label="Please specify other"
          name="medicalHistoryOther"
          type="textarea"
          rows="3"
          value={data.medicalHistoryOther}
          onChange={onChange}
          placeholder="Please specify"
          required
          // error={errors.medicalHistoryOther}
        />
      )}

      {isSalesRep && (
        <>
          <div className="sub-section">
            <h3 className="sub-section-title">
              Source(s) of the case identifier
            </h3>
            <FormField
              label="Name of reporter"
              name="reporterName"
              value={data.reporterName}
              onChange={onChange}
            />
            <FormField
              label="Name of hospital or center"
              name="caseSource"
              value={data.caseSource}
              onChange={onChange}
            />
          </div>
          {/* <div className="grid grid-2">
            <FormField
              label="Other case identifiers in previous transmissions"
              name="previousCaseIdentifiers"
              value={data.previousCaseIdentifiers}
              onChange={onChange}
            />
            <FormField
              label="Date of receipt of the most recent information"
              name="recentInformationDate"
              type="date"
              value={data.recentInformationDate}
              onChange={onChange}
            />
          </div> */}
      <CheckGroup
        label="Type of report"
        options={reportOptions}
        selected={data.reportTypes}
        onToggle={(item) => onToggle("reportTypes", item)}
      />
        </>
      )}
    </FormSection>
  );
}
