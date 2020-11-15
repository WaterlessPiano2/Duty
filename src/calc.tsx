import React from "react";
import { useForm } from "react-hook-form";

export default function Calculator(): JSX.Element {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} aria-label="Duty Calculator">
        <label htmlFor="customsValueOfGoods">Customs Value Of Goods</label>
        <input
          type="number"
          id="customsValueOfGoods"
          placeholder="Customs Value Of Goods"
          name="Customs Value Of Goods"
          ref={register({ required: true, max: 9999999, min: 0, maxLength: 8 })}
        />
        <label htmlFor="Insurance">Insurance</label>
        <input
          type="number"
          id="Insurance"
          placeholder="Insurance"
          name="Insurance"
          ref={register({ required: true, max: 9999999, min: 0, maxLength: 8 })}
        />
        <label htmlFor="Freight">Freight</label>
        <input
          type="number"
          id="Freight"
          placeholder="Freight"
          name="Freight"
          ref={register({ required: true, max: 9999999, min: 0, maxLength: 8 })}
        />
        <label htmlFor="customsDuty">Customs Duty</label>
        <input
          type="number"
          id="customsDuty"
          placeholder="Customs Duty"
          name="Customs Duty"
          ref={register({ required: true, max: 9999999, min: 0, maxLength: 8 })}
        />
        <label htmlFor="VATValueAdjustment">VAT Value Adjustment</label>
        <input
          type="number"
          id="VATValueAdjustment"
          placeholder="VAT Value Adjustment"
          name="VAT Value Adjustment"
          ref={register({ required: true, max: 500, min: 0, maxLength: 3 })}
        />

        <input type="submit" />
        <div className="results">
          <div className="result">
            Cost, Insurance and Freight (CIF) price = {"135"}
          </div>
          <div className="result">Customs Duty = {"135"}</div>
          <div className="result">VAT = {"135"}</div>
          <div className="result">Total Cost = {"135"}</div>
        </div>
      </form>
    </>
  );
}
