import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Filter, Download, Eye, Edit, Building2, MapPin, Briefcase } from 'lucide-react';
import { locations, workPositions } from '@/data/ohsData';

const Organization: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{t.admin.title}</h1>
        <p className="page-description">{t.admin.subtitle}</p>
      </div>

      <Tabs defaultValue="locations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="locations"><MapPin className="w-4 h-4 mr-2" />{t.admin.locations}</TabsTrigger>
          <TabsTrigger value="positions"><Briefcase className="w-4 h-4 mr-2" />{t.admin.workPositions}</TabsTrigger>
        </TabsList>

        <TabsContent value="locations">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>{t.common.name}</TableHead>
                    <TableHead>{language === 'mk' ? 'Тип' : language === 'sq' ? 'Lloji' : 'Type'}</TableHead>
                    <TableHead className="w-[100px]">{t.common.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations.map((loc) => (
                    <TableRow key={loc.id}>
                      <TableCell className="font-medium">{loc.id}</TableCell>
                      <TableCell>{loc.name[language]}</TableCell>
                      <TableCell><Badge variant="secondary">{loc.type}</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.admin.positionName}</TableHead>
                    <TableHead>{t.employees.department}</TableHead>
                    <TableHead>{t.admin.positionRisks}</TableHead>
                    <TableHead>{t.admin.requiredTrainings}</TableHead>
                    <TableHead className="w-[100px]">{t.common.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workPositions.map((pos) => (
                    <TableRow key={pos.id}>
                      <TableCell className="font-medium">{pos.name[language]}</TableCell>
                      <TableCell>{pos.department[language]}</TableCell>
                      <TableCell><Badge variant="outline">{pos.risks.length} risks</Badge></TableCell>
                      <TableCell><Badge variant="outline">{pos.requiredTrainings.length} trainings</Badge></TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Organization;
