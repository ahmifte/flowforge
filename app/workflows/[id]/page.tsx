import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORKFLOWS, getWorkflow } from "@/lib/workflows";
import { WorkflowRunner } from "@/components/workflow-runner";

export function generateStaticParams() {
  return WORKFLOWS.map((workflow) => ({ id: workflow.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const workflow = getWorkflow(params.id);
  if (!workflow) return {};
  return { title: workflow.name, description: workflow.description };
}

export default function WorkflowPage({ params }: { params: { id: string } }) {
  const workflow = getWorkflow(params.id);
  if (!workflow) notFound();

  // Pass only the serializable parts across the server/client boundary.
  return (
    <WorkflowRunner
      workflow={{
        id: workflow.id,
        name: workflow.name,
        description: workflow.description,
        inputNote: workflow.inputNote,
        fields: workflow.fields,
      }}
    />
  );
}
