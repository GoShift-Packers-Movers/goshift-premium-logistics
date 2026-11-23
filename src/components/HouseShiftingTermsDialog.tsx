import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * GoShift House Shifting Terms & Conditions (shown on the shared booking page).
 * If this text changes, bump HOUSE_SHIFTING_TERMS_VERSION in
 * cloud_functions/functions/sharedPackersBooking.js.
 */
const SECTIONS: { title: string; intro?: string; points: string[] }[] = [
  {
    title: "1. Inventory Verification & Confirmation",
    points: [
      "Customers are requested to carefully review the inventory/items listed in the shifting estimate before making the advance payment.",
      "Any missing, additional, or incorrect inventory details must be reported and corrected before payment confirmation.",
      "Once the advance payment is completed, the booking will be processed based on the confirmed inventory.",
      "If additional items are identified at the time of pickup, customers may request to include them, subject to service feasibility and applicable additional charges.",
      "Customers are advised to ensure that all household items are accurately declared to avoid last-minute changes or misunderstandings.",
    ],
  },
  {
    title: "2. Additional Services – Uninstallation & Reinstallation",
    points: [
      "Uninstallation and reinstallation services will be provided only for those items or services specifically mentioned in the estimate.",
      "If any uninstallation or reinstallation requirement is not mentioned in the confirmed estimate, it will not be included in the service.",
      "Customers are requested to inform our team in advance about any special installation, dismantling, or reassembly requirements.",
    ],
  },
  {
    title: "3. Rope Pulling & Long-Distance Handling",
    points: [
      "If rope pulling, external lifting, or long-distance material handling is required at the pickup or delivery location, customers must inform our team through the GoShift mobile application.",
      "Such requirements should be updated before or during the service coordination process to ensure proper planning and resource arrangements.",
      "Additional charges may apply depending on the actual requirement and service conditions.",
    ],
  },
  {
    title: "4. You Pack, We Shift Package",
    intro: "Under the You Pack, We Shift package:",
    points: [
      "The customer is responsible for packing all household belongings before the scheduled shifting date.",
      "GoShift will provide transportation, truck arrangement, loading, transportation, and unloading services.",
      "Packing materials and packing labour are not included in this package.",
    ],
  },
  {
    title: "5. Standard & Elite Packages",
    intro: "Under the Standard and Elite packages:",
    points: [
      "Our team will bring the required quality packing materials.",
      "Packing of household belongings will be carried out by our professional team.",
      "Truck transportation, loading, transportation, and unloading are included as per the confirmed package.",
      "The packing service will be provided according to the selected package and confirmed estimate.",
    ],
  },
  {
    title: "6. Furniture Dismantling & Reinstallation",
    points: [
      "Our team will assist with normal furniture dismantling and reinstallation involving standard nuts, bolts, and basic fittings.",
      "Any work requiring specialised carpentry, additional screws, drilling, furniture alignment, modifications, or professional carpenter assistance will attract additional charges.",
      "Such additional work will be undertaken based on the requirement and customer approval.",
    ],
  },
  {
    title: "7. Booking Confirmation & GoShift Application",
    points: [
      "The booking will be processed after successful advance payment.",
      "Once the advance payment is completed, the remaining booking and shifting details will be made available through the GoShift mobile application.",
      "Customers are requested to check the application regularly for booking updates, service information, and further coordination.",
    ],
  },
];

const SUPPORT_PHONES = ["+91 97503 71308", "+91 83444 15795"];

export default function HouseShiftingTermsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>GoShift – Terms &amp; Conditions</DialogTitle>
          <DialogDescription>
            House Shifting Services | Customer Guidelines &amp; Service Policy
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm text-slate-700">
          <p>Dear Customer,</p>
          <p>
            Thank you for choosing GoShift Packers &amp; Movers for your relocation requirements. To ensure a
            smooth, transparent, and hassle-free shifting experience, please carefully read the following Terms
            &amp; Conditions before confirming your booking and making the advance payment.
          </p>

          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              {s.intro && <p className="mt-1">{s.intro}</p>}
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          ))}

          <section>
            <h3 className="font-semibold text-slate-900">8. Customer Support &amp; Clarifications</h3>
            <p className="mt-1">We believe in transparent communication and customer satisfaction.</p>
            <p className="mt-1">
              For any questions, service-related clarifications, or additional requirements regarding your
              relocation, please feel free to contact our customer support team.
            </p>
            <p className="mt-2 font-medium text-slate-900">Customer Support:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {SUPPORT_PHONES.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="text-blue-600 underline underline-offset-2">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2">
              Our team will be happy to assist you and help make your shifting experience smooth and convenient.
            </p>
          </section>

          <section className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <h3 className="font-semibold text-slate-900">IMPORTANT CUSTOMER ACKNOWLEDGEMENT</h3>
            <p className="mt-1">
              By proceeding with the advance payment, the customer confirms that they have reviewed the
              estimated inventory, selected package, service inclusions, pricing details, and the above Terms
              &amp; Conditions.
            </p>
          </section>

          <p className="text-center font-semibold text-slate-900">
            GoShift Packers &amp; Movers
            <span className="block text-xs font-normal text-slate-500">
              Your Trusted Partner for a Smooth &amp; Hassle-Free Move.
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
