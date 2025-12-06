import React, { useEffect, useRef, useState } from 'react';
import functionPlot from 'function-plot';
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react';

/**
 * Componente de gráficas interactivas
 * Usa function-plot para renderizar funciones matemáticas
 */
const GraphViewer = ({ isOpen, onClose, expression }) => {
  const graphRef = useRef(null);
  const [zoom, setZoom] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !graphRef.current || !expression) return;

    try {
      // Limpiar gráfico anterior
      graphRef.current.innerHTML = '';

      // Detectar si es una función válida
      const funcMatch = expression.match(/([a-zA-Z]\w*)\s*\(([a-zA-Z])\)\s*=\s*(.+)/);
      let plotData;

      if (funcMatch) {
        const [, funcName, variable, funcBody] = funcMatch;
        plotData = {
          fn: funcBody.replace(new RegExp(variable, 'g'), 'x'),
          color: '#06b6d4', // cyan-500
        };
      } else if (expression.includes('x')) {
        plotData = {
          fn: expression,
          color: '#06b6d4',
        };
      } else {
        setError('La expresión debe contener "x" o ser una función como f(x) = x^2');
        return;
      }

      functionPlot({
        target: graphRef.current,
        width: graphRef.current.offsetWidth,
        height: 400,
        grid: true,
        xAxis: { domain: [-zoom, zoom] },
        yAxis: { domain: [-zoom, zoom] },
        data: [plotData],
        disableZoom: false,
      });

      setError(null);
    } catch (err) {
      setError(err.message || 'Error al graficar la función');
    }
  }, [isOpen, expression, zoom]);

  const handleDownload = () => {
    if (!graphRef.current) return;
    
    const svg = graphRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calq-graph.svg';
    link.click();
    
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div>
            <h3 className="text-xl font-bold text-cyan-400">Gráfica Interactiva</h3>
            <p className="text-sm text-slate-400 mt-1 font-mono">{expression}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setZoom(z => Math.max(1, z - 2))}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
              title="Zoom in"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => setZoom(z => Math.min(50, z + 2))}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
              title="Zoom out"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
              title="Descargar SVG"
            >
              <Download size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Graph Container */}
        <div className="p-6">
          {error ? (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400">
              <p className="font-semibold">Error al graficar:</p>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-xs mt-2 text-slate-400">
                Ejemplo válido: f(x) = x^2 + 2*x - 1
              </p>
            </div>
          ) : (
            <div 
              ref={graphRef} 
              className="bg-slate-900 rounded-lg overflow-hidden"
              style={{ minHeight: '400px' }}
            />
          )}

          {/* Controls Info */}
          <div className="mt-4 text-xs text-slate-500 text-center">
            Arrastra para mover • Scroll para zoom • Usa los botones para ajustar vista
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphViewer;
