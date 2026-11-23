import { useLocation } from "react-router-dom";
import {
  CheckoutActions,
  CheckoutEmpty,
  CheckoutHeader,
  CheckoutStepper,
  CheckoutSummary,
  PaymentDetailsStep,
  PaymentMethodStep,
  ReviewStep,
  SuccessStep,
} from "@/components/checkout";
import { useCheckoutFlow } from "@/hooks";
import type { CheckoutState } from "@/types";

const Checkout = () => {
  const location = useLocation();
  const state = (location.state as CheckoutState | null) ?? {};
  const flow = useCheckoutFlow(state);

  if (flow.items.length === 0 && flow.step !== 4) {
    return <CheckoutEmpty />;
  }

  const handleBack = () =>
    flow.step === 1
      ? flow.navigate(-1)
      : flow.setStep((current) => current - 1);

  return (
    <main className="mx-auto mt-19 min-h-[calc(100vh-76px)] w-full max-w-[1600px] px-5 pb-10">
      <CheckoutHeader />

      {flow.step < 4 && (
        <div className="mx-auto mt-6 max-w-3xl">
          <CheckoutStepper step={flow.step} />
        </div>
      )}

      {flow.step === 4 ? (
        <SuccessStep
          orderId={flow.orderId}
          onContinue={() => flow.navigate("/marketplace")}
        />
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="rounded-2xl border border-ink-400/40 bg-ink-800/40 p-5 sm:p-7">
            {flow.step === 1 && (
              <PaymentMethodStep
                value={flow.method}
                onChange={flow.setMethod}
              />
            )}

            {flow.step === 2 && (
              <PaymentDetailsStep
                method={flow.method}
                value={flow.details}
                onChange={(details) => {
                  flow.setDetails(details);
                  flow.setValidationErrors([]);
                }}
                savedAddresses={flow.addresses}
                savedCards={flow.paymentMethods}
                validationErrors={flow.validationErrors}
                shouldSaveDetails={flow.shouldSaveDetails}
                onSaveDetailsChange={flow.setShouldSaveDetails}
                onSelectAddress={flow.selectAddress}
                onClearSavedDetails={flow.clearSavedDetails}
              />
            )}

            {flow.step === 3 && (
              <ReviewStep method={flow.method} details={flow.details} />
            )}

            {flow.orderError && (
              <p role="alert" className="mt-4 text-sm text-red-300">
                {flow.orderError}
              </p>
            )}

            <CheckoutActions
              step={flow.step}
              onBack={handleBack}
              onContinue={flow.handleContinue}
              onPlaceOrder={flow.placeOrder}
            />
          </section>

          <CheckoutSummary items={flow.items} />
        </div>
      )}
    </main>
  );
};

export default Checkout;
