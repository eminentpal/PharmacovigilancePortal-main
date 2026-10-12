import CheckGroup from "../CheckGroup";
import FormField from "../FormField";
import FormSection from "../FormSection";
import {
  customerOptions,
  sexOptions,
  seriousnessOptions,
} from "../../constants/formOptions";

export default function PatientReactionSection({
  data,
  errors,
  onChange,
  onToggle,
}) {
  const isSalesRep = data.typeofcustomer === "Sales Rep";

  return (
    <FormSection
      title="Patient reaction information"
      description="Record the patient details and reaction observed."
    >
      <div className="grid grid-3">
        <FormField
          label="Patient Name"
          name="patientInitials"
          value={data.patientInitials}
          onChange={onChange}
          required
          error={errors.patientInitials}
        />
        <FormField
          label="Date of birth"
          name="dateOfBirth"
          type="date"
          value={data.dateOfBirth}
          onChange={onChange}
        />
        <FormField
          label="Sex"
          name="sex"
          value={data.sex}
          onChange={onChange}
          options={sexOptions}
        />
        <FormField
          label="Type of Customer"
          name="typeofcustomer"
          value={data.typeofcustomer}
          onChange={onChange}
          options={customerOptions}
          required
          error={errors.typeofcustomer}
        />
        <FormField
          label="Age (at onset of reaction)"
          name="ageAtOnset"
          type="number"
          min="0"
          value={data.ageAtOnset}
          onChange={onChange}
        />
        <FormField
          label="Enter your phone number"
          name="phoneNumber"
          type="number"
          min="0"
          value={data.phoneNumber}
          onChange={onChange}
        />
        <FormField
          label="Enter your email"
          name="email"
          type="email"
          value={data.email}
          onChange={onChange}
        />
        <FormField
          label="Date of start of reaction/event"
          name="reactionStartDate"
          type="date"
          value={data.reactionStartDate}
          onChange={onChange}
          required
          error={errors.reactionStartDate}
        />
      </div>

      <FormField
        label="Describe reaction"
        name="reactionDescription"
        type="textarea"
        rows="5"
        value={data.reactionDescription}
        onChange={onChange}
        required
        error={errors.reactionDescription}
        hint="Reaction/event as reported by the primary source."
      />

      <FormField
        label="What did you do with the drug"
        name="actionTaken"
        type="select"
        value={data.actionTaken}
        onChange={onChange}
        options={[
          "It was discarded",
          "It was returned to the Pharmacy/Hospital",
          "Others",
        ]}
        required
        error={errors.actionTaken}
      />

      {data.actionTaken === "Others" && (
        <FormField
          label="Please specify other"
          name="actionTakenOther"
          type="textarea"
          rows="3"
          value={data.actionTakenOther}
          onChange={onChange}
          placeholder="Please specify"
          required
          error={errors.actionTakenOther}
        />
      )}

      {isSalesRep && (
        <>
          <FormField
            label="Outcome at time of last observation"
            name="reactionOutcome"
            type="textarea"
            rows="3"
            value={data.reactionOutcome}
            onChange={onChange}
            required
            error={errors.reactionOutcome}
          />

          <FormField
            label="Results of (lab) tests and procedures relevant to the investigation"
            name="labResults"
            type="textarea"
            rows="3"
            value={data.labResults}
            onChange={onChange}
          />
        </>
      )}

      <CheckGroup
        label="Seriousness criteria - at case level"
        options={seriousnessOptions}
        selected={data.seriousness}
        onToggle={(item) => onToggle("seriousness", item)}
      />
    </FormSection>
  );
}
