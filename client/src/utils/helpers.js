import toast from "react-hot-toast";

export function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "short" }); // Get short month name
  const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if needed
  const formattedDate = `${month} ${day}`;
  return formattedDate;
}

export function formatDateTop() {
  const date = new Date();

  const day = date.getDate() + getOrdinalSuffix(date.getDate());

  const month = date.toLocaleString("default", { month: "short" });

  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

// Helper function to add ordinal suffix to day numbers
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  } else {
    const suffixes = [
      "th",
      "st",
      "nd",
      "rd",
      "th",
      "th",
      "th",
      "th",
      "th",
      "th",
    ];
    return suffixes[day % 10];
  }
}

export function checkDate(dateString) {
  const time = new Date(dateString);
  const referenceTime = Date.now();
  return time.getTime() < referenceTime;
}

export const copyLink = (link) => {
  navigator.clipboard.writeText(link).then(
    () => {
      // invoked if the data is copied
      toast.success("Link Copied");
    },
    () => {
      toast.error("Link Copying failed try again :(", {
        position: "top-right",
      });
    }
  );
};

export const optionTypes = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "image",
    label: "Image",
  },
  {
    value: "both",
    label: "Text & Image",
  },
];
