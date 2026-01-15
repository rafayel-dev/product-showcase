const PDFDocument = require("pdfkit");

module.exports = function generateInvoice(res, order) {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${order._id}.pdf`
  );
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  /* ================= HEADER ================= */
  doc
    .fontSize(20)
    .text("INVOICE", { align: "center" })
    .moveDown();

  doc
    .fontSize(10)
    .text("My Bangla Shop", { align: "left" })
    .text("Dhaka, Bangladesh")
    .text("Phone: 01XXXXXXXXX");

  doc.moveDown();

  /* ================= ORDER INFO ================= */
  doc.fontSize(12);
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString("en-BD")}`);
  doc.text(`Payment: ${order.paymentMethod.toUpperCase()}`);

  doc.moveDown();

  /* ================= CUSTOMER ================= */
  doc.text("Bill To:");
  doc.text(order.customerName);
  doc.text(order.phone);
  doc.text(order.address);

  doc.moveDown();

  /* ================= ITEMS ================= */
  doc.text("Items:");
  order.items.forEach((item) => {
    doc.text(
      `${item.title} × ${item.quantity} — ৳ ${item.price * item.quantity}`
    );
  });

  doc.moveDown();

  /* ================= TOTAL ================= */
  doc.fontSize(14).text(`Total: ৳ ${order.total}`, {
    align: "right",
  });

  doc.moveDown(2);

  doc
    .fontSize(10)
    .text("Thank you for shopping with us 🇧🇩", {
      align: "center",
    });

  doc.end();
};
