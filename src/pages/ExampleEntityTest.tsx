import { useState } from 'react';
import { useExampleEntities, useExampleEntity, useCreateExampleEntity, useUpdateExampleEntity, useDeleteExampleEntity } from '@/services/api/exampleService';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const { t, language } = useLanguage();
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
      toast.success(language === 'mk' ? 'Успешно креиран запис' : language === 'sq' ? 'Regjistrim i krijuar me sukses' : 'Record created successfully');
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
      toast.success(language === 'mk' ? 'Успешно ажуриран запис' : language === 'sq' ? 'Regjistrim i përditësuar me sukses' : 'Record updated successfully');
      setIsEditOpen(false);
      setEditingId(null);
      setFormData({ name: '', description: '' });
      refetch();
    } catch (error) {
      // Error е веќе обработен
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(language === 'mk' ? 'Дали сте сигурни дека сакате да го избришете овој запис?' : language === 'sq' ? 'A jeni të sigurt që dëshironi të fshini këtë regjistrim?' : 'Are you sure you want to delete this record?')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success(language === 'mk' ? 'Успешно избришан запис' : language === 'sq' ? 'Regjistrim i fshirë me sukses' : 'Record deleted successfully');
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
            <CardTitle>{language === 'mk' ? 'Грешка' : language === 'sq' ? 'Gabim' : 'Error'}</CardTitle>
            <CardDescription>{language === 'mk' ? 'Не можам да се поврзам со API' : language === 'sq' ? 'Nuk mund të lidhem me API' : 'Cannot connect to API'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()}>{language === 'mk' ? 'Обиди се повторно' : language === 'sq' ? 'Provo përsëri' : 'Try Again'}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{language === 'mk' ? 'Безбедносни Инспекции - POC' : language === 'sq' ? 'Inspektime Sigurie - POC' : 'Safety Inspections - POC'}</h1>
          <p className="text-muted-foreground mt-1">
            {language === 'mk' ? 'Тест на интеграција со ASP.NET Backend' : language === 'sq' ? 'Test integrimi me ASP.NET Backend' : 'ASP.NET Backend Integration Test'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t.common.add}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.common.add}</DialogTitle>
              <DialogDescription>
                {language === 'mk' ? 'Внесете податоци за новата инспекција' : language === 'sq' ? 'Shkruani të dhënat për inspektimin e ri' : 'Enter details for new inspection'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="name">{t.common.name} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">{t.common.notes || 'Description'}</Label>
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
                  {t.common.cancel}
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t.common.save}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'mk' ? 'Листа на инспекции' : language === 'sq' ? 'Lista e inspektimeve' : 'Inspections List'}</CardTitle>
          <CardDescription>
            {data && (language === 'mk' ? `Вкупно: ${data.totalCount} | Страна ${data.pageNumber} од ${data.totalPages}` : language === 'sq' ? `Total: ${data.totalCount} | Faqja ${data.pageNumber} nga ${data.totalPages}` : `Total: ${data.totalCount} | Page ${data.pageNumber} of ${data.totalPages}`)}
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
                    <TableHead>{t.common.name}</TableHead>
                    <TableHead>{t.common.notes || 'Description'}</TableHead>
                    <TableHead>{t.common.createdAt}</TableHead>
                    <TableHead>{t.common.actions}</TableHead>
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
                    {language === 'mk' ? 'Претходна' : language === 'sq' ? 'Paraardhëse' : 'Previous'}
                  </Button>
                  <span className="flex items-center px-4">
                    {language === 'mk' ? `Страна ${page} од ${data.totalPages}` : language === 'sq' ? `Faqja ${page} nga ${data.totalPages}` : `Page ${page} of ${data.totalPages}`}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                    disabled={page === data.totalPages}
                  >
                    {language === 'mk' ? 'Следна' : language === 'sq' ? 'Tjetra' : 'Next'}
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
              <DialogTitle>{t.common.edit}</DialogTitle>
              <DialogDescription>
                {language === 'mk' ? 'Променете ги податоците на инспекцијата' : language === 'sq' ? 'Ndryshoni të dhënat e inspektimit' : 'Update inspection details'}
              </DialogDescription>
            </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">{t.common.name} *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-description">{t.common.notes || 'Description'}</Label>
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
                {t.common.cancel}
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.common.save}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExampleEntityTest;
