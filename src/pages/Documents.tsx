import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, Download, Eye, FileText, Upload } from 'lucide-react';
import { documents } from '@/data/ohsData';

const Documents: React.FC = () => {
  const { t, language } = useLanguage();

  const getTypeBadge = (type: string) => {
    const labels = { 'law': t.documents.law, 'procedure': t.documents.procedure, 'instruction': t.documents.instruction, 'template': t.documents.template };
    return <Badge variant="secondary">{labels[type as keyof typeof labels]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{t.documents.title}</h1>
        <p className="page-description">{t.documents.subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t.common.search} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" />{t.common.filter}</Button>
          <Button><Upload className="w-4 h-4 mr-2" />{t.documents.uploadDocument}</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.documents.documentName}</TableHead>
                <TableHead>{t.documents.documentType}</TableHead>
                <TableHead>{t.documents.version}</TableHead>
                <TableHead>{t.documents.effectiveDate}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className="w-[100px]">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name[language]}</TableCell>
                  <TableCell>{getTypeBadge(doc.type)}</TableCell>
                  <TableCell>{doc.version}</TableCell>
                  <TableCell>{doc.effectiveDate}</TableCell>
                  <TableCell><Badge variant="outline" className="bg-success/15 text-success">{t.common.active}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
