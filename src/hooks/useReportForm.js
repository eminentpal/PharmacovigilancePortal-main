import { useState } from "react";
import { initialFormData, requiredFields } from "../constants/formInitialState";

export function useReportForm() {
  const [data, setData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const change = ({ target: { name, value } }) => {
    setData((current) => {
      const next = { ...current, [name]: value };
      // Hide the follow-up answers once re-administration is no longer Yes.
      if (name === "reAdministered" && value !== "Yes") {
        next.reAdministeredDate = "";
        next.rechallenge = "";
      }
      // Clear the typed route once "Others" is no longer selected.
      if (name === "routeOfAdministration" && value !== "Others") {
        next.routeOfAdministrationOther = "";
      }
      // Clear the typed action once "Others" is no longer selected.
      if (name === "actionTaken" && value !== "Others") {
        next.actionTakenOther = "";
      }
      // Clear co-administered drug answers once the answer is no longer Yes.
      if (name === "usedOtherDrug" && value !== "Yes") {
        next.concomitantDrugName = "";
        next.concomitantStartDate = "";
        next.concomitantLastAdministration = "";
      }
      return next;
    });
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const toggle = (field, item) => {
    setData((current) => ({
      ...current,
      [field]: current[field] === item ? "" : item,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    Object.entries(requiredFields).forEach(([key, message]) => {
      // Outcome is only required when the customer is a Sales Rep.
      if (key === "reactionOutcome" && data.typeofcustomer !== "Sales Rep") return;
      if (!String(data[key] ?? "").trim()) nextErrors[key] = message;
    });

    // The specified action is only required when "Others" is selected.
    if (
      data.actionTaken === "Others" &&
      !String(data.actionTakenOther ?? "").trim()
    ) {
      nextErrors.actionTakenOther = "Please specify the action taken.";
    }

    // Follow-up questions are only required when re-administration is Yes.
    if (data.reAdministered === "Yes") {
      if (!String(data.reAdministeredDate ?? "").trim())
        nextErrors.reAdministeredDate = "Enter when it was re-administered.";
      if (!String(data.rechallenge ?? "").trim())
        nextErrors.rechallenge = "Select whether the reaction re-occurred.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const reset = () => {
    setData(initialFormData);
    setErrors({});
  };

  return { data, errors, change, toggle, validate, reset };
}
