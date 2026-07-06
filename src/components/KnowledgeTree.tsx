import { useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { treeNodes, treeEdges } from '../data/relationships'
import ThinkerDrawer from './ThinkerDrawer'
import { Filter } from 'lucide-react'

// Custom node component
function SchoolNode({ data }: any) {
  return <div style={{ padding: '8px 16px', borderRadius: 12, background: 'linear-gradient(135deg, #ee4422, #ee6644)', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', border: '2px solid rgba(238,68,34,0.5)' }}>{data.label}</div>
}
function ThinkerNode({ data }: any) {
  return <div style={{ padding: '6px 12px', borderRadius: 8, background: 'white', color: '#1a1a2e', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid #d1d5db', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{data.label}</div>
}
function ConceptNode({ data }: any) {
  return <div style={{ padding: '4px 10px', borderRadius: 999, background: '#eef2ff', color: '#4338ca', fontSize: 11, fontWeight: 600, cursor: 'pointer', border: '1px solid #c7d2fe' }}>{data.label}</div>
}

const nodeTypes = { school: SchoolNode, thinker: ThinkerNode, concept: ConceptNode }

export default function KnowledgeTree() {
  const [selectedRefId, setSelectedRefId] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'school' | 'thinker' | 'concept'>('all')

  const onNodeClick = useCallback((_: any, node: Node) => {
    const refId = (node as any).data?.refId
    const nType = (node as any).data?.type
    if (refId) { setSelectedRefId(refId); setSelectedType(nType) }
  }, [])

  // Apply filter
  const displayNodes = filter === 'all'
    ? treeNodes
    : treeNodes.map(n => ({ ...n, hidden: (n as any).type !== filter }))

  return (
    <div style={{ width: '100%', height: '70vh', minHeight: '450px', borderRadius: 16, overflow: 'hidden', border: '1px solid #d1d5db', background: 'white', position: 'relative' }}>
      {/* Filter bar */}
      <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, display: 'flex', gap: 4, background: 'rgba(255,255,255,0.9)', borderRadius: 8, padding: 4, border: '1px solid #e5e7eb' }}>
        <Filter size={14} style={{ alignSelf: 'center', marginLeft: 4, color: '#9ca3af' }} />
        {(['all', 'school', 'thinker', 'concept'] as const).map(key => (
          <button key={key} onClick={() => setFilter(key)}
            style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
              background: filter === key ? '#ee4422' : 'transparent', color: filter === key ? 'white' : '#6b7280' }}
          >{key === 'all' ? '全部' : key === 'school' ? '学派' : key === 'thinker' ? '思想家' : '概念'}</button>
        ))}
      </div>

      <ReactFlow
        defaultNodes={displayNodes as any}
        defaultEdges={treeEdges as any}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
      >
        <Background color="#94a3b8" gap={20} size={1} />
        <Controls />
      </ReactFlow>

      <ThinkerDrawer
        refId={selectedRefId}
        type={selectedType}
        onClose={() => { setSelectedRefId(null); setSelectedType(null) }}
      />
    </div>
  )
}
