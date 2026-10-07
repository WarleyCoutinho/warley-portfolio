import {
  Document,
  Page,
  View,
  Text,
  Image as PdfImage,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { PROFILE as profile } from "@/lib/data";
import {
  SITE_URL,
  siteDomainLabel,
  resumeRole,
  resumeLocation,
  resumeSkills,
  resumeObjective,
  resumeProjects,
  resumeJobs,
  resumeEarlierCareer,
  education,
  certifications,
  languages,
} from "@/lib/resume-content";

Font.registerHyphenationCallback((word) => [word]);

type Theme = {
  bg: string;
  raised: string;
  border: string;
  text: string;
  textDim: string;
  textFaint: string;
  amber: string;
};

const dark: Theme = {
  bg: "#12151a",
  raised: "#1a1e25",
  border: "#2a2f38",
  text: "#ece9e2",
  textDim: "#b3bac6",
  textFaint: "#8a93a2",
  amber: "#e8952a",
};

const light: Theme = {
  bg: "#ffffff",
  raised: "#f7f5f0",
  border: "#ddd8cc",
  text: "#14171c",
  textDim: "#374151",
  textFaint: "#5b6270",
  amber: "#b3711a",
};

function makeStyles(t: Theme) {
  return StyleSheet.create({
    page: {
      backgroundColor: t.bg,
      color: t.text,
      fontFamily: "Helvetica",
      fontSize: 8.8,
      lineHeight: 1.3,
      paddingTop: 26,
      paddingHorizontal: 32,
      paddingBottom: 34,
    },

    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    photoFrame: {
      width: 62,
      padding: 3,
      backgroundColor: t.raised,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: t.border,
      borderStyle: "solid",
    },
    photo: { width: 54, height: 54, borderRadius: 3, objectFit: "cover" },
    headerCenter: { flex: 1, alignItems: "center", paddingHorizontal: 10 },
    name: {
      fontFamily: "Helvetica-Bold",
      fontSize: 22,
      lineHeight: 1.1,
      textAlign: "center",
    },
    role: {
      fontSize: 9.5,
      lineHeight: 1.3,
      color: t.amber,
      fontFamily: "Helvetica-Bold",
      textAlign: "center",
      marginTop: 2,
    },
    contactLine: {
      fontSize: 8,
      lineHeight: 1.3,
      color: t.textFaint,
      textAlign: "center",
      marginTop: 3,
    },
    headerRight: { width: 140, alignItems: "flex-end" },
    link: {
      color: t.amber,
      textDecoration: "none",
      fontSize: 8,
      lineHeight: 1.5,
    },

    // Seções
    h2: {
      fontFamily: "Helvetica-Bold",
      fontSize: 11.5,
      lineHeight: 1.2,
      borderBottomWidth: 0.8,
      borderBottomColor: t.amber,
      borderBottomStyle: "solid",
      paddingBottom: 2,
      marginTop: 10,
      marginBottom: 5,
    },
    labeled: { marginBottom: 1.5, color: t.textDim },
    bold: { fontFamily: "Helvetica-Bold", color: t.text },
    italic: { fontFamily: "Helvetica-Oblique" },

    bullet: { flexDirection: "row", marginBottom: 1.5, paddingLeft: 8 },
    bulletDot: { width: 10, color: t.amber },
    bulletText: { flex: 1, color: t.textDim },

    itemHead: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: 5,
      marginBottom: 1,
    },
    itemTitle: { flex: 1, paddingRight: 8, fontSize: 9.4, color: t.textDim },
    itemDate: {
      fontFamily: "Helvetica-Oblique",
      fontSize: 8.2,
      color: t.textFaint,
    },
    itemDesc: {
      fontFamily: "Helvetica-Oblique",
      color: t.textFaint,
      marginBottom: 1.5,
    },
    stack: {
      fontFamily: "Helvetica-Oblique",
      color: t.textFaint,
      marginTop: 1,
      marginBottom: 2,
    },
    earlier: { marginTop: 6, color: t.textDim },

    qrBlock: { flexDirection: "row", alignItems: "center", marginTop: 8 },
    qrImage: { width: 34, height: 34, marginRight: 8, borderRadius: 2 },
    qrLabel: {
      fontSize: 7.5,
      color: t.textFaint,
      width: 220,
      lineHeight: 1.35,
    },

    footer: {
      position: "absolute",
      left: 32,
      right: 32,
      bottom: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 7,
      lineHeight: 1,
      color: t.textFaint,
      paddingTop: 5,
      borderTopWidth: 0.8,
      borderTopColor: t.border,
      borderTopStyle: "solid",
    },
  });
}

type Styles = ReturnType<typeof makeStyles>;

function Bullet({ s, children }: { s: Styles; children: ReactNode }) {
  return (
    <View style={s.bullet}>
      <Text style={s.bulletDot}>•</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  );
}

export function ResumeDocument({
  theme,
  qrDataUrl,
  photoDataUrl,
}: {
  theme: "dark" | "light";
  qrDataUrl: string;
  photoDataUrl: string;
}) {
  const t = theme === "dark" ? dark : light;
  const s = makeStyles(t);

  return (
    <Document
      title={`${profile.name} — Currículo`}
      author={profile.name}
      subject={`Currículo — ${resumeRole}`}
    >
      <Page size="A4" style={s.page}>
        {/* Cabeçalho */}
        <View style={s.headerRow}>
          <View style={s.photoFrame}>
            <PdfImage src={photoDataUrl} style={s.photo} />
          </View>

          <View style={s.headerCenter}>
            <Text style={s.name}>{profile.name}</Text>
            <Text style={s.role}>{resumeRole}</Text>
            <Text style={s.contactLine}>
              {resumeLocation} · {profile.email}
            </Text>
          </View>

          <View style={s.headerRight}>
            <Link src={profile.github} style={s.link}>
              {`github.com${profile.githubLabel}`}
            </Link>
            <Link src={profile.linkedin} style={s.link}>
              {`linkedin.com${profile.linkedinLabel}`}
            </Link>
            <Link src={SITE_URL} style={s.link}>
              {siteDomainLabel}
            </Link>
          </View>
        </View>

        {/* Habilidades */}
        <Text style={s.h2}>Habilidades</Text>
        {resumeSkills.map((group) => (
          <Text key={group.label} style={s.labeled}>
            <Text style={s.bold}>{group.label} </Text>
            {group.items}
          </Text>
        ))}

        {/* Objetivo */}
        <Text style={s.h2}>Objetivo</Text>
        {resumeObjective.map((line) => (
          <Bullet key={line} s={s}>
            {line}
          </Bullet>
        ))}

        {/* Projetos */}
        <Text style={s.h2}>Projetos</Text>
        {resumeProjects.map((project) => (
          <View key={project.name} wrap={false}>
            <View style={s.itemHead}>
              <Text style={s.itemTitle}>
                <Text style={s.bold}>{project.name}</Text>
                {` | ${project.tech} | `}
                <Link src={project.href} style={s.link}>
                  {project.linkLabel}
                </Link>
              </Text>
            </View>
            <Text style={s.itemDesc}>{project.description}</Text>
            {project.bullets.map((b) => (
              <Bullet key={b} s={s}>
                {b}
              </Bullet>
            ))}
          </View>
        ))}

        {/* Experiência */}
        <Text style={s.h2}>Experiência Profissional</Text>
        {resumeJobs.map((job) => (
          <View key={job.company + job.period} wrap={false}>
            <View style={s.itemHead}>
              <Text style={s.itemTitle}>
                <Text style={s.bold}>{job.company}</Text>
                {` | ${job.role} | ${job.place}`}
              </Text>
              <Text style={s.itemDate}>{job.period}</Text>
            </View>
            {job.bullets.map((b) => (
              <Bullet key={b} s={s}>
                {b}
              </Bullet>
            ))}
            <Text style={s.stack}>
              <Text style={s.bold}>Stack: </Text>
              {job.stack}
            </Text>
          </View>
        ))}
        <Text style={s.earlier}>
          <Text style={s.bold}>Antes da tecnologia: </Text>
          {resumeEarlierCareer}
        </Text>

        {/* Educação, certificações e idiomas */}
        <View wrap={false}>
          <Text style={s.h2}>Educação, Certificações e Idiomas</Text>
          <Bullet s={s}>
            {education.degree} — {education.school}.
          </Bullet>
          <Bullet s={s}>Certificações: {certifications.join(", ")}.</Bullet>
          <Bullet s={s}>{languages}</Bullet>

          <View style={s.qrBlock}>
            <PdfImage src={qrDataUrl} style={s.qrImage} />
            <Text style={s.qrLabel}>
              Escaneie o QR code para ver o portfólio sempre atualizado.
            </Text>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text>{siteDomainLabel}</Text>
          <Text>{`currículo gerado em ${new Date().toLocaleDateString("pt-BR")}`}</Text>
        </View>
      </Page>
    </Document>
  );
}
