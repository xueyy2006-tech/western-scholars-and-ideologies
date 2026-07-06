import { useCallback, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { treeNodes, treeEdges } from '../data/relationships'
import ThinkerDrawer from './ThinkerDrawer'
import { Filter } from 'lucide-react'

const nodeTypes = {
  school: ({ data }: any) => (
    <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-bold shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 border-primary-400/50">
      {data.label}
    </div>
  ),
  thinker: ({ data }: any) => (
    <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium shadow-md cursor-pointer hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
      {data.label}
    </div>
  ),
  concept: ({ data }: any) => (
    <div className="px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs font-medium shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-accent-200 dark:border-accent-800">
      {data.label}
    </div>
  ),
}

export default function KnowledgeTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(treeNodes as any)
  const [edges, setEdges, onEdgesChange] = useEdgesState(treeEdges as any)
  const [selectedRefId, setSelectedRefId] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'school' | 'thinker' | 'concept'>('all')

  const onNodeClick = useCallback((_: any, node: Node) => {
    const refId = (node.data as any)?.refId
    const nodeType = (node.data as any)?.type
    if (refId) {
      setSelectedRefId(refId)
      setSelectedType(nodeType)
    }
  }, [])

  const filteredNodes = useMemo(() => {
    if (filter === 'all') return nodes
    return nodes.map(n => {
      const nType = (n.data as any)?.type
      return {
        ...n,
        hidden: nType !== filter,
      }
    })
  }, [nodes, filter])

  const filterButtons = [
    { key: 'all', label: '全部' },
    { key: 'school', label: '学派' },
    { key: 'thinker', label: '思想家' },
    { key: 'concept', label: '概念' },
  ] as const

  return (
    <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Filter bar */}
      <div className="absolute top-3 left-3 z-10 flex gap-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200 dark:border-gray-700">
        <Filter size={14} className="self-center ml-1 text-gray-400" />
        {filterButtons.map(btn => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === btn.key
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <ReactFlow
        nodes={filteredNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          style: { stroke: '#94a3b8', strokeWidth: 1.5 },
          animated: false,
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#94a3b8" gap={20} size={1} />
        <Controls className="!rounded-lg !shadow-md !border-gray-200 dark:!border-gray-700" />
        <MiniMap
          className="!rounded-lg !shadow-md"
          maskColor="rgba(0,0,0,0.1)"
          nodeColor={(n) => {
            const type = (n.data as any)?.type
            if (type === 'school') return '#ee4422'
            if (type === 'thinker') return '#5c7cfa'
            return '#748ffc'
          }}
        />
      </ReactFlow>

      {/* Detail drawer */}
      <ThinkerDrawer
        refId={selectedRefId}
        type={selectedType}
        onClose={() => { setSelectedRefId(null); setSelectedType(null); }}
      />
    </div>
  )
}
