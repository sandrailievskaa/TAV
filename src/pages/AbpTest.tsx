import { useState, useEffect } from 'react';
import { getTests, createTest, deleteTest, TestDto } from '@/services/api/abpTestService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2 } from 'lucide-react';

const AbpTest = () => {
  const [tests, setTests] = useState<TestDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const loadTests = async () => {
    setLoading(true);
    try {
      const data = await getTests();
      setTests(data);
    } catch (error: any) {
      console.error('Load error:', error);
      const errorMsg = error?.message || 'Грешка при вчитување. Проверете дали ABP backend работи на порта 5002.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;

    try {
      await createTest({ name, age: parseInt(age) });
      toast.success('Успешно креиран');
      setName('');
      setAge('');
      loadTests();
    } catch (error: any) {
      console.error('Create error:', error);
      const errorMsg = error?.message || 'Грешка при креирање';
      toast.error(errorMsg);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Дали сте сигурни?')) return;

    try {
      await deleteTest(id);
      toast.success('Успешно избришан');
      loadTests();
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error('Грешка при бришење');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ABP Backend Test (olgica branch)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleCreate} className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="name">Име</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Внесете име"
                required
              />
            </div>
            <div className="w-24">
              <Label htmlFor="age">Возраст</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Возраст"
                required
                min="0"
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={loading}>
                <Plus className="mr-2 h-4 w-4" />
                Додади
              </Button>
            </div>
          </form>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {tests.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Нема записи</p>
              ) : (
                tests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-3 border rounded"
                  >
                    <div>
                      <span className="font-medium">{test.name}</span>
                      <span className="text-muted-foreground ml-2">- {test.age} години</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(test.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AbpTest;

