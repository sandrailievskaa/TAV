import { useState } from 'react';
import { useExampleEntities, useExampleEntity, useCreateExampleEntity, useUpdateExampleEntity, useDeleteExampleEntity } from '@/services/api/exampleService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';

const ExampleEntityTest = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, error, refetch } = useExampleEntities(page, pageSize);
  const createMutation = useCreateExampleEntity();
  const updateMutation = useUpdateExampleEntity();
  const deleteMutation = useDeleteExampleEntity();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        name: formData.name,
        description: formData.description || undefined,
      });
      toast.success('Успешно креиран ентитет');
      setIsCreateOpen(false);
      setFormData({ name: '', description: '' });
      refetch();
    } catch (error) {
      // Error е веќе обработен во API client
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsEditOpen(true);
    // Fetch entity data
    const entity = data?.items.find(e => e.id === id);
    if (entity) {
      setFormData({
        name: entity.name,
        description: entity.description || '',
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    
    try {
      await updateMutation.mutateAsync({
        id: editingId,
        data: {
          name: formData.name,
          description: formData.description || undefined,
        },
      });
      toast.success('Успешно ажуриран ентитет');
      setIsEditOpen(false);
      setEditingId(null);
      setFormData({ name: '', description: '' });
      refetch();
    } catch (error) {
      // Error е веќе обработен
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Дали сте сигурни дека сакате да го избришете овој ентитет?')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Успешно избришан ентитет');
      refetch();
    } catch (error) {
      // Error е веќе обработен
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Грешка</CardTitle>
            <CardDescription>Не можам да се поврзам со API</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()}>Обиди се повторно</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Example Entity - POC Test</h1>
          <p className="text-muted-foreground mt-1">
            Тест страна за интеграција со ASP.NET Backend
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Нов Ентитет
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Креирај нов ентитет</DialogTitle>
              <DialogDescription>
                Внесете податоци за новиот ентитет
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="name">Име *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Опис</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Откажи
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Креирај
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Листа на ентитети</CardTitle>
          <CardDescription>
            {data && `Вкупно: ${data.totalCount} | Страна ${data.pageNumber} од ${data.totalPages}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Име</TableHead>
                    <TableHead>Опис</TableHead>
                    <TableHead>Креиран</TableHead>
                    <TableHead>Акции</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.items.map((entity) => (
                    <TableRow key={entity.id}>
                      <TableCell className="font-mono text-xs">
                        {entity.id.substring(0, 8)}...
                      </TableCell>
                      <TableCell>{entity.name}</TableCell>
                      <TableCell>{entity.description || '-'}</TableCell>
                      <TableCell>
                        {new Date(entity.createdAt).toLocaleString('mk-MK')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(entity.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(entity.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {data && data.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Претходна
                  </Button>
                  <span className="flex items-center px-4">
                    Страна {page} од {data.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                    disabled={page === data.totalPages}
                  >
                    Следна
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Уреди ентитет</DialogTitle>
            <DialogDescription>
              Променете ги податоците на ентитетот
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Име *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Опис</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditOpen(false);
                  setEditingId(null);
                  setFormData({ name: '', description: '' });
                }}
              >
                Откажи
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Зачувај
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExampleEntityTest;
