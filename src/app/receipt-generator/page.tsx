"use client";

import { useState } from "react";

interface ReceiptData {
  totalFare: number;
  baseFare: number;
  duration: string;
  applicationFee: number;
  agreedFare: number;
  cardNumber: string;
  transactionDate: string;
  transactionTime: string;
}

export default function ReceiptGenerator() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [datetime, setDatetime] = useState("");
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  const generateReceipt = async () => {
    if (!origin || !destination || !datetime) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("/api/generate-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, datetime }),
      });

      if (!response.ok) {
        throw new Error("Error al generar el recibo");
      }

      const data = await response.json();
      setReceipt(data);
    } catch (error) {
      alert("Error generando recibo: " + error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold mb-4">Generador de Recibos</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Dirección de origen</label>
        <input
          type="text"
          placeholder="Ej: Polanco, CDMX"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Dirección de destino</label>
        <input
          type="text"
          placeholder="Ej: Roma Norte, CDMX"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Fecha y hora del viaje</label>
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        onClick={generateReceipt}
        className="w-full bg-gray-700 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!origin || !destination || !datetime}
      >
        Generar Recibo
      </button>

      {receipt && (
        <div className="mt-6 bg-white border border-gray-300 rounded p-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            MXN${receipt.totalFare.toFixed(2)}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Si el viaje se modifica, la tarifa se actualizará con base en las tarifas que se muestran a continuación y cualquier otra tarifa aplicable.
          </p>

          <div className="mb-4 bg-gray-50 rounded p-4">
            <h3 className="font-semibold mb-3">Detalles de la tarifa del viaje</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Tarifa total</span>
                <span className="font-medium">MXN${receipt.totalFare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Duración del viaje</span>
                <span className="font-medium">{receipt.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Cuota de solicitud</span>
                <span className="font-medium">MXN${receipt.applicationFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tarifa acordada</span>
                <span className="font-medium">MXN${receipt.agreedFare.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-3">Historial de pagos</h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-black rounded text-white text-xs flex items-center justify-center mr-3">
                  <span className="font-bold">{receipt.cardNumber}</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">
                    {receipt.transactionDate}, {receipt.transactionTime}
                  </div>
                </div>
              </div>
              <div className="text-right font-medium">MXN${receipt.totalFare.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
