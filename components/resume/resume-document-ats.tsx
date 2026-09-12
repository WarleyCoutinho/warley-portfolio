import { Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import { profile, stackGroups, experience, earlierCareer } from "@/lib/data";
import {
  resumeSummary,
  resumeStats,
  education,
  certifications,
  availability,
  resumeProjects,
  resumeExperienceOverrides,
  siteDomainLabel,
} from "@/lib/resume-content";

// Evita hifenização automática quebrando palavras no meio (ex: "sis-tema")
Font.registerHyphenationCallback((word) => [word]);

// Versão pensada pra parser de ATS, não pra olho humano:
// - coluna única, ordem de leitura top-to-bottom sem ambiguidade
// - preto sobre branco, sem imagem/QR/ícone (nada não-textual que possa
//   confundir extração ou ficar fora da ordem de leitura)
// - tags de stack viram texto corrido separado por vírgula, não "chips"
// - cabeçalhos de seção em texto simples, sem numeração decorativa
const s = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.3,
    paddingVertical: 20,
    paddingHorizontal: 36,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 19,
    lineHeight: 1.1,
    marginBottom: 4,
  },
  role: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    lineHeight: 1.2,
    marginBottom: 5,
  },
  contact: {
    fontSize: 8.5,
    lineHeight: 1.3,
    color: "#222222",
    marginBottom: 8,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.3,
    marginBottom: 6,
  },
  statsLine: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
    paddingBottom: 1,
    marginTop: 6,
    marginBottom: 3,
  },
  job: { marginBottom: 4 },
  jobTitleLine: { fontSize: 9.5, fontFamily: "Helvetica-Bold", marginBottom: 1 },
  jobDate: { fontSize: 8.3, color: "#333333", marginBottom: 1 },
  jobDesc: { fontSize: 9, lineHeight: 1.3, marginBottom: 1 },
  jobStack: { fontSize: 8, color: "#333333" },
  project: { marginBottom: 3 },
  projectTitleLine: { fontSize: 9.5, fontFamily: "Helvetica-Bold", marginBottom: 1 },
  projectDesc: { fontSize: 9, lineHeight: 1.3 },
  prehist: { fontSize: 8.3, color: "#333333", marginTop: 1, lineHeight: 1.3 },
  stackLine: { fontSize: 9, lineHeight: 1.32, marginBottom: 2 },
  stackLabel: { fontFamily: "Helvetica-Bold" },
  sideLine: { fontSize: 9, lineHeight: 1.3, marginBottom: 1 },
  footer: {
    position: "absolute",
    left: 36,
    right: 36,
    bottom: 10,
    fontSize: 7.5,
    color: "#555555",
    textAlign: "center",
  },
});

export function ResumeDocumentATS() {
  return (
    <Document
      title={`${profile.name} — Currículo (ATS)`}
      author={profile.name}
      subject="Currículo — Desenvolvedor Full Stack"
    >
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{profile.name}</Text>
        <Text style={s.role}>{profile.role} — Next.js, Fastify, TypeScript</Text>
        <Text style={s.contact}>
          {profile.location} | {profile.phone} | {profile.email} | linkedin.com
          {profile.linkedinLabel} | github.com{profile.githubLabel} | {siteDomainLabel}
        </Text>

        <Text style={s.summary}>{resumeSummary}</Text>

        <Text style={s.statsLine}>
          {resumeStats.map((stat) => `${stat.value} ${stat.label}`).join("   |   ")}
        </Text>

        <Text style={s.sectionTitle}>Experiência</Text>
        {experience.map((job) => (
          <View key={job.company + job.period} style={s.job} wrap={false}>
            <Text style={s.jobTitleLine}>
              {job.company} — {job.role}
            </Text>
            <Text style={s.jobDate}>{job.period}</Text>
            <Text style={s.jobDesc}>
              {resumeExperienceOverrides[job.company] ?? job.description}
            </Text>
            <Text style={s.jobStack}>Stack: {job.tags.join(", ")}</Text>
          </View>
        ))}
        <View wrap={false}>
          <Text style={s.jobDate}>{earlierCareer.period}</Text>
          <Text style={s.prehist}>Antes da tecnologia: {earlierCareer.description}</Text>
        </View>

        <Text style={s.sectionTitle}>Projetos em destaque</Text>
        {resumeProjects.map((project) => (
          <View key={project.title} style={s.project} wrap={false}>
            <Text style={s.projectTitleLine}>
              {project.title} — {project.linkLabel}
            </Text>
            <Text style={s.projectDesc}>{project.description}</Text>
          </View>
        ))}

        <Text style={s.sectionTitle}>Stack técnica</Text>
        {stackGroups.map((group) => (
          <Text key={group.title} style={s.stackLine}>
            <Text style={s.stackLabel}>{group.title}: </Text>
            {group.items.join(", ")}
          </Text>
        ))}

        <Text style={s.sectionTitle}>Formação</Text>
        <Text style={s.sideLine}>
          {education.degree} — {education.school}
        </Text>

        <Text style={s.sectionTitle}>Certificações</Text>
        <Text style={s.sideLine}>{certifications.join(", ")}</Text>

        <Text style={s.sectionTitle}>Disponibilidade</Text>
        <Text style={s.sideLine}>{availability}</Text>

        <Text style={s.footer} fixed>
          {siteDomainLabel} — currículo gerado em {new Date().toLocaleDateString("pt-BR")} — versão texto puro, compatível com ATS
        </Text>
      </Page>
    </Document>
  );
}
