import { useState } from "react";
import { z } from "zod";
import { PageHeader } from "@/components/layout/page-header";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusBadge } from "@/components/ui/nexus-badge";
import { CrudTable, CrudFormDialog, DeleteDialog, type CrudColumnDef, type FieldDef } from "@/features/shared";
import { Plus } from "lucide-react";

interface OrgRow {
  id: string;
  name: string;
  slug: string;
  status: string;
  owner_id: string;
  members: number;
}

const mockOrgs: OrgRow[] = [
  { id: "1", name: "Acme Corp", slug: "acme", status: "active", owner_id: "u1", members: 45 },
  { id: "2", name: "Globex Inc", slug: "globex", status: "active", owner_id: "u2", members: 23 },
  { id: "3", name: "Initech", slug: "initech", status: "suspended", owner_id: "u3", members: 12 },
  { id: "4", name: "Umbrella Corp", slug: "umbrella", status: "active", owner_id: "u4", members: 67 },
  { id: "5", name: "Stark Industries", slug: "stark", status: "active", owner_id: "u5", members: 150 },
];

const columns: CrudColumnDef<OrgRow>[] = [
  { id: "name", header: "Organization", accessorKey: "name", sortable: true, minWidth: 180 },
  { id: "slug", header: "Slug", accessorKey: "slug" },
  { id: "members", header: "Members", accessorKey: "members", sortable: true },
  {
    id: "status", header: "Status", accessorKey: "status",
    filterable: true,
    filterOptions: [{ label: "Active", value: "active" }, { label: "Suspended", value: "suspended" }],
    cell: (row) => <NexusBadge variant={row.status === "active" ? "success" : "danger"}>{row.status}</NexusBadge>,
  },
];

const createSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  slug: z.string().trim().min(1, "Slug is required").max(50).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, hyphens only"),
});

const editSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  slug: z.string().trim().min(1, "Slug is required").max(50).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, hyphens only"),
  status: z.string().min(1, "Status is required"),
});

const createFields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true, placeholder: "e.g. Acme Corp" },
  { name: "slug", label: "Slug", type: "text", required: true, placeholder: "e.g. acme-corp", description: "URL-friendly identifier" },
];

const editFields: FieldDef[] = [
  ...createFields,
  { name: "status", label: "Status", type: "select", required: true, options: [{ label: "Active", value: "active" }, { label: "Suspended", value: "suspended" }] },
];

export default function OrganizationsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<OrgRow | null>(null);
  const [deleteItem, setDeleteItem] = useState<OrgRow | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title="Organizations" description="Manage organizations and their members." actions={<NexusButton onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4" /> New Organization</NexusButton>} />
      <CrudTable columns={columns} data={mockOrgs} onEdit={setEditItem} onDelete={setDeleteItem} selectable />
      <CrudFormDialog open={createOpen} onOpenChange={setCreateOpen} title="Create Organization" fields={createFields} schema={createSchema} onSubmit={async (v) => console.log("create", v)} submitLabel="Create" />
      <CrudFormDialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)} title="Edit Organization" fields={editFields} schema={editSchema} initialValues={editItem || undefined} onSubmit={async (v) => console.log("update", editItem?.id, v)} submitLabel="Save Changes" />
      <DeleteDialog open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)} resourceName="Organization" itemName={deleteItem?.name} onConfirm={async () => console.log("delete", deleteItem?.id)} />
    </div>
  );
}
