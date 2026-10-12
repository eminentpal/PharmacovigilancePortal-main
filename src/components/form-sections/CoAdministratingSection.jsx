import FormField from "../FormField";
import FormSection from "../FormSection";
import { yesNoOptions } from "../../constants/formOptions";

export default function CoAdministratingSection({ data, errors, onChange }) {
  return (
    <FormSection
      title="Co-administrating"
      description="Add a medicine taken alongside the suspected drug, if applicable."
    >
      <FormField
        label="Did you use any other drug alongside the suspected drug?"
        name="usedOtherDrug"
        value={data.usedOtherDrug}
        onChange={onChange}
        options={yesNoOptions}
        required
        error={errors.usedOtherDrug}
      />
      {data.usedOtherDrug === "Yes" && (
        <>
          <FormField
            label="Drug identification (name)"
            name="concomitantDrugName"
            value={data.concomitantDrugName}
            onChange={onChange}
          />
          <div className="grid grid-2">
            <FormField
              label="Date of first use"
              name="concomitantStartDate"
              type="date"
              value={data.concomitantStartDate}
              onChange={onChange}
            />
            <FormField
              label="Date of last use"
              name="concomitantLastAdministration"
              type="date"
              value={data.concomitantLastAdministration}
              onChange={onChange}
            />
          </div>
        </>
      )}
    </FormSection>
  );
}
