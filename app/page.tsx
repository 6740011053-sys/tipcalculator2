"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [bill, setBill] = useState<string>("40");
  const [tipPercent, setTipPercent] = useState<number>(0);

  const [tipTotal, setTipTotal] = useState<number>(0);
  const [billTotal, setBillTotal] = useState<number>(0);

  const billNumber = useMemo(() => {
    const n = Number(bill);
    return isNaN(n) ? 0 : n;
  }, [bill]);

  const tipButtons = [5];

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

  const formatMoney = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="min-h-screen w-full bg-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="rounded-2xl bg-white shadow-xl border border-pink-200 overflow-hidden">

          <div className="px-8 py-6 border-b border-pink-200 bg-white">
            <h1 className="text-2xl font-bold text-pink-700">
             My Tip Calculator
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <div>
                <label className="block text-sm font-semibold text-pink-700">
                  Bill Amount
                </label>

                <div className="mt-2 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 font-semibold">
                    $
                  </span>

                  <input
                    value={bill}
                    onChange={(e) => setBill(e.target.value)}
                    type="number"
                    className="w-full rounded-xl border border-pink-200 bg-white px-10 py-3 text-lg font-semibold text-slate-900 outline-none
                    focus:ring-4 focus:ring-pink-100 focus:border-pink-400"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-pink-700">
                    Tip Percentage
                  </p>

                  <p className="text-sm text-pink-400">
                    Selected:{" "}
                    <span className="font-bold text-pink-700">
                      {tipPercent}%
                    </span>
                  </p>
                </div>

                <div className="mt-3">
                  {tipButtons.map((p) => {
                    const active = tipPercent === p;

                    return (
                      <button
                        key={p}
                        onClick={() => setTipPercent(p)}
                        className={[
                          "w-full rounded-xl py-3 font-semibold border transition",
                          active
                            ? "bg-pink-600 text-white border-pink-600"
                            : "bg-white text-pink-700 border-pink-200 hover:bg-pink-50",
                        ].join(" ")}
                      >
                        {p}%
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleCalculate}
                  className="w-full rounded-xl py-3 font-semibold bg-pink-600 text-white hover:bg-pink-700 transition"
                >
                  Calculate
                </button>

                <button
                  onClick={handleReset}
                  className="w-full rounded-xl py-3 font-semibold bg-pink-100 text-pink-800 hover:bg-pink-200 transition"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="p-8 bg-pink-50 border-t md:border-t-0 md:border-l border-pink-200 flex flex-col justify-center gap-6">
              <div className="rounded-xl bg-white border border-pink-200 p-6">
                <p className="text-sm font-semibold text-pink-500">
                  Tip Total
                </p>
                <p className="mt-2 text-3xl font-bold text-pink-700">
                  ${formatMoney(tipTotal)}
                </p>
              </div>

              <div className="rounded-xl bg-white border border-pink-200 p-6">
                <p className="text-sm font-semibold text-pink-500">
                  Bill Total
                </p>
                <p className="mt-2 text-4xl font-bold text-pink-700">
                  ${formatMoney(billTotal)}
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}
