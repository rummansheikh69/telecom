import React, { useState, useEffect } from "react";

import { Building2, Plus, Trash2, Edit2, Check } from "lucide-react";
import { MotherModal } from "./MotherModal";

export function MethodManagerModal({ isOpen, onClose, gatewayData, onSave }) {
  const [walletNumbers, setWalletNumbers] = useState({
    bkash: "",
    nagad: "",
    rocket: "",
    binance: "",
  });

  const [banks, setBanks] = useState([]);
  const [newBank, setNewBank] = useState({
    bankName: "",
    title: "",
    account: "",
    branch: "",
    routingNumber: "",
  });
  const [editingBankId, setEditingBankId] = useState(null);

  useEffect(() => {
    if (gatewayData) {
      setWalletNumbers(gatewayData.walletNumbers || {});
      setBanks(gatewayData.banks || []);
    }
  }, [gatewayData]);

  const handleWalletChange = (field, value) => {
    setWalletNumbers((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOrUpdateBank = () => {
    if (!newBank.bankName || !newBank.account) return;

    if (editingBankId) {
      setBanks(
        banks.map((b) =>
          b.id === editingBankId ? { ...newBank, id: editingBankId } : b,
        ),
      );
      setEditingBankId(null);
    } else {
      setBanks([...banks, { ...newBank, id: "bank_" + Date.now() }]);
    }

    setNewBank({
      bankName: "",
      title: "",
      account: "",
      branch: "",
      routingNumber: "",
    });
  };

  const handleEditBank = (bank) => {
    setEditingBankId(bank.id);
    setNewBank(bank);
  };

  const handleDeleteBank = (id) => {
    setBanks(banks.filter((b) => b.id !== id));
  };

  const handleSaveAll = () => {
    onSave({ walletNumbers, banks });
    onClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Payment Gateways"
    >
      <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
        {/* Wallet Numbers Section */}
        <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Mobile Wallets & Binance
          </h4>

          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-extrabold text-[#D8136B]">
                bKash Number
              </label>
              <input
                type="text"
                value={walletNumbers.bkash}
                onChange={(e) => handleWalletChange("bkash", e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-[#F46F22]">
                Nagad Number
              </label>
              <input
                type="text"
                value={walletNumbers.nagad}
                onChange={(e) => handleWalletChange("nagad", e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-[#8F2A85]">
                Rocket Number
              </label>
              <input
                type="text"
                value={walletNumbers.rocket}
                onChange={(e) => handleWalletChange("rocket", e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-[#F3BA2F]">
                Binance Pay ID
              </label>
              <input
                type="text"
                value={walletNumbers.binance}
                onChange={(e) => handleWalletChange("binance", e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Bank Management (CRUD) Section */}
        <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Bank Accounts CRUD</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </h4>

          {/* Existing Banks List */}
          <div className="space-y-2">
            {banks.map((b) => (
              <div
                key={b.id}
                className="bg-white p-2.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs"
              >
                <div>
                  <p className="font-bold text-slate-800">{b.bankName}</p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Acc: {b.account} | {b.branch}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleEditBank(b)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteBank(b.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add / Edit Bank Form */}
          <div className="bg-white p-3 rounded-xl border border-dashed border-slate-300 space-y-2 pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {editingBankId ? "Edit Bank" : "Add New Bank"}
            </span>
            <input
              type="text"
              placeholder="Bank Name (e.g. Eastern Bank)"
              value={newBank.bankName}
              onChange={(e) =>
                setNewBank({ ...newBank, bankName: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs"
            />
            <input
              type="text"
              placeholder="Account Title"
              value={newBank.title}
              onChange={(e) =>
                setNewBank({ ...newBank, title: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Account Number"
                value={newBank.account}
                onChange={(e) =>
                  setNewBank({ ...newBank, account: e.target.value })
                }
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono"
              />
              <input
                type="text"
                placeholder="Routing Number"
                value={newBank.routingNumber}
                onChange={(e) =>
                  setNewBank({ ...newBank, routingNumber: e.target.value })
                }
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono"
              />
            </div>
            <input
              type="text"
              placeholder="Branch Name"
              value={newBank.branch}
              onChange={(e) =>
                setNewBank({ ...newBank, branch: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs"
            />

            <button
              type="button"
              onClick={handleAddOrUpdateBank}
              className="w-full py-2 bg-slate-800 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1"
            >
              {editingBankId ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              {editingBankId ? "Update Bank" : "Add Bank Account"}
            </button>
          </div>
        </div>

        {/* Save All Changes */}
        <button
          type="button"
          onClick={handleSaveAll}
          className="w-full py-3 bg-[#073E7D] text-white font-bold text-xs rounded-xl shadow-md"
        >
          Save All Configuration
        </button>
      </div>
    </MotherModal>
  );
}
