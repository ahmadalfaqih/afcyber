// app/advanced-mode/NetworkDiagram.tsx
"use client";

import { Background, Controls, MiniMap, ReactFlow, useNodesState, useEdgesState } from 'reactflow';
import { motion } from 'framer-motion';
import 'reactflow/dist/style.css';

// تعريف العقد والحواف
const initialNodes = [
  {
    id: 'internet',
    type: 'input',
    data: { label: 'الإنترنت' },
    position: { x: 100, y: 250 },
  },
  {
    id: 'firewall',
    type: 'default',
    data: { label: 'جدار الحماية' },
    position: { x: 300, y: 250 },
  },
  {
    id: 'dmz',
    type: 'default',
    data: { label: 'DMZ' },
    position: { x: 500, y: 150 },
  },
  {
    id: 'internal',
    type: 'default',
    data: { label: 'الشبكة الداخلية' },
    position: { x: 500, y: 350 },
  },
  {
    id: 'server',
    type: 'output',
    data: { label: 'خادم حساس' },
    position: { x: 700, y: 350 },
  },
];

const initialEdges = [
  { id: 'e1', source: 'internet', target: 'firewall', animated: true },
  { id: 'e2', source: 'firewall', target: 'dmz', animated: true },
  { id: 'e3', source: 'firewall', target: 'internal', animated: true },
  { id: 'e4', source: 'internal', target: 'server', animated: true },
];

export default function NetworkDiagram({ isUnderAttack = false, firewallEnabled = true, idsEnabled = true }) {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  // تغيير لون الحواف حسب الحالة
  const updatedEdges = edges.map(edge => {
    if (isUnderAttack && edge.id === 'e1') {
      return { ...edge, style: { stroke: '#ef4444', strokeWidth: 3, animation: 'pulse 1s ease-in-out infinite' } };
    }
    if (isUnderAttack && edge.id === 'e2' && firewallEnabled) {
      return { ...edge, style: { stroke: '#10b981', strokeWidth: 3, animation: 'glow 1s ease-in-out infinite' } };
    }
    if (isUnderAttack && edge.id === 'e2' && !firewallEnabled) {
      return { ...edge, style: { stroke: '#f59e0b', strokeWidth: 3, animation: 'shake 0.5s ease-in-out infinite' } };
    }
    return edge;
  });

  // إضافة أنماط CSS للحركات
  const styles = `
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
    @keyframes glow {
      0% { filter: drop-shadow(0 0 5px #10b981); }
      50% { filter: drop-shadow(0 0 10px #10b981); }
      100% { filter: drop-shadow(0 0 5px #10b981); }
    }
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-2px); }
      50% { transform: translateX(2px); }
      75% { transform: translateX(-2px); }
      100% { transform: translateX(0); }
    }
  `;

  return (
    <div className="h-full w-full relative">
      {/* إدراج الأنماط */}
      <style>{styles}</style>

      {/* مؤثرات خلفية عند الهجوم */}
      {isUnderAttack && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-red-500 pointer-events-none"
        />
      )}

      {/* نافذة تنبيه إذا كان IDS غير مفعل */}
      {!idsEnabled && isUnderAttack && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-lg shadow-lg z-50 border border-red-400"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c1.268-1.028 2.93-1.028 4.198 0 1.269 1.028 1.87 2.686 1.417 4.247l-.576 2.473a3.61 3.61 0 01-3.444 3.026 3.61 3.61 0 01-3.444-3.026l-.576-2.473a3.61 3.61 0 011.417-4.247zM11.25 12.75a.75.75 0 110 1.5.75.75 0 010-1.5zm-2.25 0a.75.75 0 110 1.5.75.75 0 010-1.5z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">⚠️ تنبيه: IDS معطل!</span>
          </div>
        </motion.div>
      )}

      {/* نافذة تنبيه إذا كان جدار الحماية غير مفعل */}
      {!firewallEnabled && isUnderAttack && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className="absolute top-16 right-4 bg-yellow-600 text-white p-3 rounded-lg shadow-lg z-50 border border-yellow-400"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c1.268-1.028 2.93-1.028 4.198 0 1.269 1.028 1.87 2.686 1.417 4.247l-.576 2.473a3.61 3.61 0 01-3.444 3.026 3.61 3.61 0 01-3.444-3.026l-.576-2.473a3.61 3.61 0 011.417-4.247zM11.25 12.75a.75.75 0 110 1.5.75.75 0 010-1.5zm-2.25 0a.75.75 0 110 1.5.75.75 0 010-1.5z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">⚠️ جدار الحماية معطل!</span>
          </div>
        </motion.div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={updatedEdges}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnScroll={true}
        panOnDrag={true}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
      >
        {/* خلفية متحركة */}
        <Background
          color="#888"
          gap={20}
          size={1}
          style={{
            backgroundImage: `radial-gradient(circle at 10px 10px, rgba(136, 136, 136, 0.2) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* مؤثرات حركة عند الهجوم */}
        {isUnderAttack && (
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.3 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
              backgroundSize: '200% 200%',
              backgroundPosition: '0% 0%',
            }}
          />
        )}

        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}