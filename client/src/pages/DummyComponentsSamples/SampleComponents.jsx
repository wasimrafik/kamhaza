import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
/**
 * IMPORTANT: Adjust these import paths to match your project structure.
 * I used "@/components/..." assuming you set alias "@" -> "src" in Vite.
 */
import CustBreadCrumb from "../../components/BreadCrumb/CustBreadCrumb";
import CustButtons from "../../components/CustButton";
import CustAutoComplete from "../../components/AutoCompleteComponents/CustAutoComplete";
import NewCustAutoComplete from "../../components/AutoCompleteComponents/NewCustAutoComplete";
import CustCalendar from "../../components/Calendar/CustCalendar";
import CustCheckboxRadio from "../../components/CustomInputsTypes/CustCheckboxRadio";
import ComingSoon from "../../components/CustComingSoon";
import CustCarousel from "../../components/CarouselAndAccordian/CustCarousel";
import CustChips from "../../components/CustChips";
import CustDynamicForm from "../../components/Forms/CustDynamicForm";
import CustDynamicTable from "../../components/Tables/CustDynamicTable";
import CustFileUpload from "../../components/FileUpload/CustFileUpload";
import CustMultiSelect from "../../components/DropdownAndMuliselect/CustMultiSelect";
import CustPagination from "../../components/Pagination/CustPagination";

/** Extras you mentioned later (prefix standardized to "Cust") */
import CustSlider from "../../components/CarouselAndAccordian/CustSlider";
import CustTableFilterHeader from "../../components/Tables/CustTableFilterHeader";
import CustModal from "../../components/Modal/CustModal";
import CustOverlayPanel from "../../components/Modal/CustomOverlayPanel";
import CustAccordion from "../../components/CarouselAndAccordian/CustAccordian";
import CustCard from "../../components/Card/CustCard";
import CustInputSlider from "../../components/CustomInputsTypes/CustInputSlider";
import CustStepper from "../../components/Pagination/CustStepper";
import CustToast from "../../components/Toaster/CustToast";
import CustDynamicInput from "../../components/CustomInputsTypes/CustomDynamicInput";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import NoDataFoundImage from "../../../assets/Images/NoDataFoundImage.png";

/** Types/Prop placeholders you referenced; if you only had TS types earlier, just ignore these imports. */
// import { CustomActionMenuProps, CustomeCalendarProps, ModalProps, ToolbarHeaderProps, TabViewProps, MessageBannerProps, PasswordInputProps } from "@/types";

/** Dummy data */
const products = [
  { id: 1, name: "Brake Pad", brand: "ISUZU", price: 120.5, stock: 42, status: "Active" },
  { id: 2, name: "Oil Filter", brand: "HINO", price: 85, stock: 5, status: "Low" },
  { id: 3, name: "Air Filter", brand: "Mitsubishi", price: 60, stock: 0, status: "Out" },
];

const users = [
  { id: "U-1001", name: "Aisha", role: "Admin" },
  { id: "U-1002", name: "Zain", role: "Manager" },
  { id: "U-1003", name: "Fahad", role: "Operator" },
];

const optionsSimple = ["JAC", "HINO", "JMC", "ZX Auto", "Mitsubishi", "ISUZU"];
const optionsObjects = optionsSimple.map((o, i) => ({ label: o, value: o.toLowerCase(), id: i + 1 }));
const images = [
  { src: "https://picsum.photos/seed/1/800/400", alt: "slide 1" },
  { src: "https://picsum.photos/seed/2/800/400", alt: "slide 2" },
  { src: "https://picsum.photos/seed/3/800/400", alt: "slide 3" },
];

const breadcrumbConfig = {
  "/components": {
    title: "Components Showcase",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "UI", path: "/ui" },
      { name: "Components" }
    ]
  }
};

const ComponentsShowcase = () => {
  // Local demo states
  const [brand, setBrand] = useState("");
  const [brandsMulti, setBrandsMulti] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [qty, setQty] = useState(10);
  const [chips, setChips] = useState(["JAC", "HINO"]);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [range, setRange] = useState([10, 70]);

  const overlayRef = useRef(null);
  const toastRef = useRef(null);

  // For table demo
  const columns = useMemo(
    () => [
      { field: "id", header: "ID" },
      { field: "name", header: "Name" },
      { field: "brand", header: "Brand" },
      { field: "price", header: "Price" },
      { field: "stock", header: "Stock" },
      { field: "status", header: "Status" },
    ],
    []
  );

  // DynamicForm demo (adjust to your component’s API)
  const formSchema = {
    fields: [
      { type: "text", name: "partName", label: "Part Name", placeholder: "Enter part name", required: true },
      { type: "select", name: "brand", label: "Brand", options: optionsObjects, required: true },
      { type: "number", name: "price", label: "Price (SAR)", min: 0, step: 0.5 },
      { type: "date", name: "availableFrom", label: "Available From" },
      { type: "checkbox", name: "active", label: "Active?" },
    ],
    submitText: "Save Part",
  };

  // Stepper demo
  const steps = [
    { label: "Details" },
    { label: "Pricing" },
    { label: "Review" },
  ];

  return (
    <div className="p-4 space-y-10">
      {/* If your CustBreadCrumb uses pageTitles, it will render automatically for /components; else, we pass a local config */}
      <section>
        <h1 className="text-2xl font-semibold mb-2">Components Showcase</h1>
        <p className="text-gray-500 mb-3">A quick way to visually verify all reusable components with sample props.</p>
        {/* OPTIONAL: If CustBreadCrumb reads a global config, leave it as is; otherwise, you can embed a “local” breadcrumb above. */}
        <CustBreadCrumb />
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <CustButtons label="Primary" variant="primary" onClick={() => toastRef.current?.show({ severity: "info", summary: "Clicked", detail: "Primary Button" })} />
          <CustButtons label="Danger" variant="danger" />
          <CustButtons label="Outline" variant="outline" />
          <CustButtons label="With Icon" icon="pi pi-check" />
          <CustButtons label="Disabled" disabled />
        </div>
      </section>

      {/* AutoComplete */}
      <section>
        <h2 className="text-xl font-semibold mb-4">AutoComplete</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <CustAutoComplete
            value={brand}
            onChange={setBrand}
            options={optionsSimple}
            placeholder="Search brand..."
          />
          <NewCustAutoComplete
            value={brand}
            onChange={setBrand}
            suggestions={optionsObjects}
            field="label"
            placeholder="New auto-complete"
          />
        </div>
      </section>

      {/* Calendar / Date */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Calendar</h2>
        <CustCalendar value={dateValue} onChange={setDateValue} showIcon showTime />
      </section>

      {/* Checkbox & Radio */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Checkbox & Radio</h2>
        <CustCheckboxRadio
          checkboxes={[
            { label: "Active", value: "active" },
            { label: "In Stock", value: "in_stock" },
          ]}
          radios={[
            { label: "SAR", value: "sar" },
            { label: "USD", value: "usd" },
          ]}
          onChange={(v) => console.log("Checkbox/Radio changed:", v)}
        />
      </section>

      {/* Carousel */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Carousel</h2>
        <CustCarousel images={images} />
      </section>

      {/* Chips */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Chips</h2>
        <CustChips value={chips} onChange={setChips} placeholder="Add tags and press Enter" />
      </section>

      {/* Dynamic Form */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Dynamic Form</h2>
        <CustDynamicForm
          schema={formSchema}
          defaultValues={{ partName: "Oil Filter", brand: "isuzu", price: 85, active: true }}
          onSubmit={(values) => console.log("Form submit:", values)}
        />
      </section>

      {/* Dynamic Table + Filter header + Pagination */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Table</h2>
        <CustTableFilterHeader
          placeholder="Filter by name/brand..."
          onFilter={(q) => console.log("Filter query:", q)}
          actions={[
            { label: "Export", icon: "pi pi-download", onClick: () => console.log("Export") },
            { label: "Add", icon: "pi pi-plus", onClick: () => setModalOpen(true) },
          ]}
        />
        <CustDynamicTable
          columns={columns}
          data={products}
          onRowClick={(row) => console.log("Row clicked:", row)}
        />
        <CustPagination
          page={page}
          total={30}
          pageSize={10}
          onChange={(p) => setPage(p)}
        />
      </section>

      {/* File Upload */}
      <section>
        <h2 className="text-xl font-semibold mb-4">File Upload</h2>
        <CustFileUpload
          accept=".jpg,.png,.pdf"
          maxSizeMB={5}
          onUpload={(files) => console.log("Uploaded:", files)}
        />
      </section>

      {/* MultiSelect */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Multi Select</h2>
        <CustMultiSelect
          value={brandsMulti}
          onChange={setBrandsMulti}
          options={optionsObjects}
          optionLabel="label"
          placeholder="Select brands"
        />
      </section>

      {/* Sliders */}
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Slider</h2>
          <CustSlider value={qty} min={0} max={100} step={1} onChange={setQty} />
          <p className="text-sm text-gray-600 mt-1">Qty: {qty}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Input Slider (Range)</h2>
          <CustInputSlider value={range} min={0} max={100} step={5} onChange={setRange} range />
          <p className="text-sm text-gray-600 mt-1">Range: {range[0]} – {range[1]}</p>
        </div>
      </section>

      {/* Accordion & Card */}
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Accordion</h2>
          <CustAccordion
            items={[
              { header: "Section 1", content: "This is content for section 1." },
              { header: "Section 2", content: "This is content for section 2." },
            ]}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Card</h2>
          <CustCard
            title="ISUZU Brake Pad"
            subTitle="SKU: BP-001"
            footer={<Link className="text-blue-600" to="#">View details</Link>}
          >
            <p>Premium brake pad with extended life. In stock.</p>
          </CustCard>
        </div>
      </section>

      {/* Overlay Panel & Modal */}
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Overlay Panel</h2>
          <div className="flex gap-3">
            <CustButtons label="Open Overlay" onClick={(e) => overlayRef.current?.toggle(e)} />
          </div>
          <CustOverlayPanel ref={overlayRef}>
            <div className="p-2 text-sm">Hello from OverlayPanel 👋</div>
          </CustOverlayPanel>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Modal</h2>
          <CustButtons label="Open Modal" onClick={() => setModalOpen(true)} />
          <CustModal
            visible={modalOpen}
            header="Create item"
            onHide={() => setModalOpen(false)}
            onConfirm={() => { console.log("Confirmed"); setModalOpen(false); }}
          >
            <div className="space-y-2 text-sm">
              <div>Put your form/content here.</div>
            </div>
          </CustModal>
        </div>
      </section>

      {/* Stepper */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Stepper</h2>
        <CustStepper
          steps={steps}
          activeIndex={activeStep}
          onChange={setActiveStep}
        />
        <div className="mt-3 flex gap-2">
          <CustButtons label="Prev" onClick={() => setActiveStep((s) => Math.max(0, s - 1))} />
          <CustButtons label="Next" onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))} />
        </div>
      </section>

      {/* Toast & Message banner (Toast shown via Buttons above) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Toast</h2>
        <CustButtons label="Show Success" onClick={() => toastRef.current?.show({ severity: "success", summary: "Saved", detail: "Record saved" })} />
        <CustButtons label="Show Error" variant="danger" onClick={() => toastRef.current?.show({ severity: "error", summary: "Error", detail: "Something went wrong" })} />
        <CustToast ref={toastRef} />
      </section>

      {/* Dynamic Input / Coming Soon */}
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Dynamic Input</h2>
          <CustDynamicInput
            fields={[
              { label: "Key", name: "key" },
              { label: "Value", name: "value" },
            ]}
            onChange={(rows) => console.log("DynamicInput rows:", rows)}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <ComingSoon title="Analytics Module" subtitle="Under construction" />
        </div>

        <div>
            <NoDataFound 
  title="No results"
  description="Nothing matches your search. Try different filters."
  imageSrc={NoDataFoundImage}
/>

        </div>
      </section>
    </div>
  );
};

export default ComponentsShowcase;
