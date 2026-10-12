import FormField from "../FormField";
import FormSection from "../FormSection";
import SearchableSelect from "../SearchableSelect";
import {
  drugOptions,
  rechallengeOptions,
  routeOptions,
  yesNoOptions,
} from "../../constants/formOptions";

export default function CharacterizationOfDrugRoleSection({
  data,
  errors,
  onChange,
}) {
  return (
    <FormSection
      title="Characterization of drug role"
      description="Provide details of the suspected medicine."
    >
      <SearchableSelect
        label="Drug identification"
        name="suspectedDrugName"
        value={data.suspectedDrugName}
        onChange={onChange}
        required
        error={errors.suspectedDrugName}
        hint={"Name of drug"}
        options={drugOptions}
      />
      <div className="grid grid-2">
        <FormField
          label="Batch number"
          name="batchNumber"
          value={data.batchNumber}
          onChange={onChange}
        />
        <FormField
          label="Manufacturing/expiry date"
          name="manufactureExpiryDate"
          type="date"
          value={data.manufactureExpiryDate}
          onChange={onChange}
        />
        <FormField
          label="Daily dose(s)"
          name="dailyDose"
          value={data.dailyDose}
          onChange={onChange}
        />
        <FormField
          label="Route of administration"
          name="routeOfAdministration"
          value={data.routeOfAdministration}
          onChange={onChange}
          options={routeOptions}
        />
        {data.routeOfAdministration === "Others" && (
          <FormField
            label="Specify route of administration"
            name="routeOfAdministrationOther"
            value={data.routeOfAdministrationOther}
            onChange={onChange}
            error={errors.routeOfAdministrationOther}
          />
        )}
      </div>
      <FormField
        label="Indication for use in the case"
        name="indication"
        type="textarea"
        rows="3"
        value={data.indication}
        onChange={onChange}
      />
      <div className="grid grid-2">
        <FormField
          label="Date of first use"
          name="drugStartDate"
          type="date"
          value={data.drugStartDate}
          onChange={onChange}
        />
        <FormField
          label="Date of last use"
          name="lastAdministrationDate"
          type="date"
          value={data.lastAdministrationDate}
          onChange={onChange}
        />
        <FormField
          label="Was there a re-administration?"
          name="reAdministered"
          value={data.reAdministered}
          onChange={onChange}
          options={yesNoOptions}
          required
          error={errors.reAdministered}
        />
        {data.reAdministered === "Yes" && (
          <FormField
            label="When was it re-administered"
            name="reAdministeredDate"
            type="date"
            value={data.reAdministeredDate}
            onChange={onChange}
            required
            error={errors.reAdministeredDate}
          />
        )}
        {data.reAdministered === "Yes" && (
          <FormField
            label="Did reaction re-occur on re-administration?"
            name="rechallenge"
            value={data.rechallenge}
            onChange={onChange}
            options={rechallengeOptions}
            required
            error={errors.rechallenge}
          />
        )}
      </div>
    </FormSection>
  );
}
