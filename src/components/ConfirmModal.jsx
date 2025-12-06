import React,{ useState } from 'react';
import { X } from 'lucide-react';

/**
 * Modal de confirmación personalizado
 * @param {object} props - { isOpen, onClose, onConfirm, title, message }
 */
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-slate-700">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <h3 className="text-xl font-bold text-cyan-400 mb-3">{title}</h3>
        <p className="text-slate-300 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
