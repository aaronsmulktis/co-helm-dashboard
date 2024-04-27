import { Status } from "@/types/case";

export function statusBgColor(status: string): string {
  console.log(Status.Complete, status);
  switch (status) {
    case Status.Submitted:
      return "bg-gray-100";
    case Status.Processing:
      return "bg-yellow-500";
    case Status.Complete:
      return "bg-kelp-500";
    default:
      return "bg-gray-100";
  }
}

export function statusTextColor(status: string): string {
  switch (status) {
    case Status.Submitted:
      return "gray-400";
    case Status.Processing:
      return "yellow-500";
    case Status.Complete:
      return "kelp-400";
    default:
      return "gray-500";
  }
}

export function decisionColor(decision: boolean): string {
  switch (decision) {
    case true:
      return "kelp-500";
    case false:
      return "red-500";
    default:
      return "gray-500";
  }
}