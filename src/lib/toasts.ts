"use client";
export async function toastSuccess(msg: string, ms = 1400) {
  const Swal = (await import("sweetalert2")).default;
  await Swal.fire({ toast: true, position: "top-end", icon: "success", title: msg, showConfirmButton: false, timer: ms, timerProgressBar: true });
}