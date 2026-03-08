import { useState } from "react";
import { z } from "zod";
import { PageHeader } from "@/components/layout/page-header";
import { NexusButton } from "@/components/ui/nexus-button";
import { CrudTable, CrudFormDialog, DeleteDialog, type CrudColumnDef, type FieldDef } from "@/features/shared";
import { Plus } from "lucide-react";
import type { Role } from "@/lib/api/types";

const mockRoles: (Role & { id: string })[] = [
  { id: "1", name: "Admin", description: "Full access to all resources", created_at: 1700000000 },
  { id: "2", name: "Editor", description: "Can create and edit content", created_at: 1700100000 },
  { id: "3", name: "Viewer", description: "Read-only access", created_at: 1700200000 },
  { id: "4", name: "Moderator", description: "Can moderate user content", created_at: 1700300000 },
  { id: "5", name: "Manager", description: "Team management capabilities", created_at: 1700400000 },
];

const columns: CrudColumnDef<typeof mockRoles[0]>[] = [
  { id: "name", header: "Role Name", accessorKey: "name", sortable: true, minWidth: 160 },
  { id: "description", header: "Description", accessorKey: "description", minWidth: 250 },
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50),
  description: z.string().max(500).optional(),
});

const fields: FieldDef[] = [
  { name: "name", label: "Role Name", type: "text", required: true, placeholder: "e.g. Manager" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Describe the role's permissions…" },
];

export default function RolesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof mockRoles[0] | null>(null);
  const [deleteItem, setDeleteItem] = useState<typeof mockRoles[0] | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles"
        description="Define and manage access roles."
        actions={<NexusButton onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4" /> Create Role</NexusButton>}
      />
      <CrudTable columns={columns} data={mockRoles} onEdit={setEditItem} onDelete={setDeleteItem} />
      <CrudFormDialog open={createOpen} onOpenChange={setCreateOpen} title="Create Role" fields={fields} schema={schema} onSubmit={async (v) => console.log("create", v)} submitLabel="Create Role" />
      <CrudFormDialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)} title="Edit Role" fields={fields} schema={schema} initialValues={editItem || undefined} onSubmit={async (v) => console.log("update", editItem?.id, v)} submitLabel="Save Changes" />
      <DeleteDialog open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)} resourceName="Role" itemName={deleteItem?.name} onConfirm={async () => console.log("delete", deleteItem?.id)} />
    </div>
  );
}
