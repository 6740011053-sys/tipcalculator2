"use client";

import { useMemo, useState } from "react";

/*BillForm Component*/
type BillFormProps = {
  bill: string;
  setBill: (value: string) => void;
};

function BillForm({ bill, setBill }: BillFormProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        Bill Amount
      </label>

      <div className="mt-2 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
          $
        </span>

        <input
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          type="number"
          className="w-full rounded-lg border border-gray-300 bg-white px-10 py-2 text-base text-black outline-none
          focus:ring-2 focus:ring-gray-200 focus:border-gray-500"
          placeholder="0"
        />
      </div>
    </div>
  );
}

/*HandleTip Component*/
type HandleTipProps = {
  tipPercent: number;
  setTipPercent: (value: number) => void;
};

function HandleTip({ tipPercent, setTipPercent }: HandleTipProps) {
  const tipButtons = [5];

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">Tip Percentage</p>

        <p className="text-sm text-gray-500">
          Selected: <span className="font-bold text-gray-800">{tipPercent}%</span>
        </p>
      </div>

      <div className="mt-2">
        {tipButtons.map((p) => {
          const active = tipPercent === p;

          return (
            <button
              key={p}
              onClick={() => setTipPercent(p)}
              className={[
                "w-full rounded-lg py-2 font-semibold border",
                active
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100",
              ].join(" ")}
            >
              {p}%
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ShowSummary Component*/
type ShowSummaryProps = {
  tipTotal: number;
  billTotal: number;
};

function ShowSummary({ tipTotal, billTotal }: ShowSummaryProps) {
  const formatMoney = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="p-8 bg-gray-100 border-t md:border-t-0 md:border-l border-gray-300 flex flex-col justify-center gap-6">
      <div className="rounded-lg bg-white border border-gray-300 p-6">
        <p className="text-sm font-semibold text-gray-600">Tip Total</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          ${formatMoney(tipTotal)}
        </p>
      </div>

      <div className="rounded-lg bg-white border border-gray-300 p-6">
        <p className="text-sm font-semibold text-gray-600">Bill Total</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          ${formatMoney(billTotal)}
        </p>
      </div>
    </div>
  );
}

/* Page (Main) */
export default function Page() {
  const [bill, setBill] = useState<string>("40");
  const [tipPercent, setTipPercent] = useState<number>(0);

  const [tipTotal, setTipTotal] = useState<number>(0);
  const [billTotal, setBillTotal] = useState<number>(0);

  const billNumber = useMemo(() => {
    const n = Number(bill);
    return isNaN(n) ? 0 : n;
  }, [bill]);

  const handleCalculate = () => {
    const tip = (billNumber * tipPercent) / 100;
    const total = billNumber + tip;

    setTipTotal(tip);
    setBillTotal(total);
  };

  const handleReset = () => {
    setBill("40");
    setTipPercent(0);
    setTipTotal(0);
    setBillTotal(0);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="rounded-xl bg-white shadow border border-gray-300 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-300 bg-white">
            <h1 className="text-2xl font-bold text-gray-900">
              My Tip Calculator
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              {/* BillForm */}
              <BillForm bill={bill} setBill={setBill} />

              {/* HandleTip */}
              <HandleTip
                tipPercent={tipPercent}
                setTipPercent={setTipPercent}
              />

              {/* Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleCalculate}
                  className="w-full rounded-lg py-2 font-semibold bg-gray-800 text-white hover:bg-gray-900"
                >
                  Calculate
                </button>

                <button
                  onClick={handleReset}
                  className="w-full rounded-lg py-2 font-semibold bg-gray-200 text-gray-900 hover:bg-gray-300"
                >
                  Reset
                </button>
              </div>
            </div>

            {/*ShowSummary*/}
            <ShowSummary tipTotal={tipTotal} billTotal={billTotal} />
          </div>
        </div>
      </div>
    </div>
  );
}
