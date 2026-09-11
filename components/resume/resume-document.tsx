import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  profile,
  stackGroups,
  experience,
  earlierCareer,
} from "@/lib/data";
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

type Theme = {
  bg: string;
  raised: string;
  border: string;
  borderSoft: string;
  text: string;
  textDim: string;
  textFaint: string;
  amber: string;
};

const dark: Theme = {
  bg: "#12151a",
  raised: "#1a1e25",
  border: "#2a2f38",
  borderSoft: "#22262e",
  text: "#ece9e2",
  textDim: "#9099a8",
  textFaint: "#7a8290",
  amber: "#e8952a",
};

const light: Theme = {
  bg: "#ffffff",
  raised: "#f7f5f0",
  border: "#ddd8cc",
  borderSoft: "#e6e2d8",
  text: "#14171c",
  textDim: "#4b5563",
  textFaint: "#5b6270",
  amber: "#b3711a",
};

// Tag/chip com margem própria (direita + baixo) em vez de `gap` no container —
// `gap` em Views com flexWrap se comporta de forma inconsistente no react-pdf.
function makeStyles(t: Theme) {
  return StyleSheet.create({
    page: {
      backgroundColor: t.bg,
      color: t.text,
      fontFamily: "Helvetica",
      fontSize: 9,
      lineHeight: 1.3,
      paddingTop: 24,
      paddingHorizontal: 32,
      paddingBottom: 36,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    headerText: { width: 400 },
    eyebrow: {
      fontFamily: "Courier",
      fontSize: 7.5,
      lineHeight: 1,
      color: t.amber,
      marginBottom: 5,
    },
    name: {
      fontFamily: "Helvetica-Bold",
      fontSize: 23,
      lineHeight: 1,
      marginBottom: 7,
    },
    role: {
      fontFamily: "Courier-Bold",
      fontSize: 10,
      lineHeight: 1,
      color: t.amber,
      marginBottom: 8,
    },
    contact: {
      fontFamily: "Courier",
      fontSize: 7.5,
      lineHeight: 1.5,
      color: t.textFaint,
    },
    photo: {
      width: 62,
      height: 62,
      borderRadius: 4,
      objectFit: "cover",
    },
    photoFrame: {
      width: 68,
      padding: 3,
      backgroundColor: t.raised,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: t.border,
      borderStyle: "solid",
    },
    summary: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: t.borderSoft,
      borderStyle: "solid",
      paddingVertical: 7,
      marginTop: 10,
      color: t.textDim,
      fontSize: 8.5,
      lineHeight: 1.4,
    },
    stats: { flexDirection: "row", marginTop: 10, marginBottom: 2 },
    statBlock: { width: 150 },
    statNum: {
      fontFamily: "Helvetica-Bold",
      fontSize: 17,
      lineHeight: 1,
      color: t.amber,
      marginBottom: 3,
    },
    statLabel: {
      fontFamily: "Courier",
      fontSize: 6.5,
      lineHeight: 1.35,
      color: t.textFaint,
      width: 105,
    },
    cols: { flexDirection: "row", marginTop: 12 },
    colLeft: { width: 322 },
    colRight: { width: 177, marginLeft: 22 },
    sectionTitle: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 7,
    },
    sectionNum: {
      fontFamily: "Courier-Bold",
      fontSize: 7.5,
      lineHeight: 1,
      color: t.amber,
      marginRight: 6,
    },
    sectionLabel: { fontFamily: "Helvetica-Bold", fontSize: 10, lineHeight: 1 },
    job: { marginBottom: 7 },
    jobDate: {
      fontFamily: "Courier",
      fontSize: 7,
      lineHeight: 1,
      color: t.textFaint,
      marginBottom: 3,
    },
    jobTitleRow: { flexDirection: "row", flexWrap: "wrap", fontSize: 9.5, lineHeight: 1.3 },
    jobCompany: { fontFamily: "Helvetica-Bold" },
    jobRole: { color: t.amber, fontFamily: "Helvetica-Bold" },
    jobDesc: {
      color: t.textDim,
      fontSize: 8,
      lineHeight: 1.4,
      marginTop: 3,
      marginBottom: 4,
    },
    projectItem: { marginBottom: 6 },
    projectDesc: {
      color: t.textDim,
      fontSize: 8,
      lineHeight: 1.4,
      marginTop: 2,
    },
    tags: { flexDirection: "row", flexWrap: "wrap" },
    tag: {
      borderWidth: 1,
      borderColor: t.border,
      borderStyle: "solid",
      backgroundColor: t.raised,
      color: t.textDim,
      fontFamily: "Courier",
      fontSize: 6.5,
      lineHeight: 1,
      paddingVertical: 3,
      paddingHorizontal: 5,
      borderRadius: 2,
      marginRight: 4,
      marginBottom: 4,
    },
    prehist: {
      borderTopWidth: 1,
      borderColor: t.borderSoft,
      borderStyle: "solid",
      paddingTop: 6,
      color: t.textFaint,
      fontSize: 7.5,
      lineHeight: 1.35,
    },
    stackGroup: { marginBottom: 9 },
    stackGroupLabel: {
      fontFamily: "Courier",
      fontSize: 7,
      lineHeight: 1,
      color: t.textFaint,
      marginBottom: 5,
    },
    sideBlock: { marginBottom: 9 },
    sideH3: {
      fontFamily: "Helvetica-Bold",
      fontSize: 9,
      lineHeight: 1.2,
      marginBottom: 3,
    },
    sideSub: { color: t.textDim, fontSize: 8, lineHeight: 1.35 },
    certItem: {
      flexDirection: "row",
      fontSize: 8,
      lineHeight: 1.3,
      marginBottom: 3,
      color: t.textDim,
    },
    certBullet: { color: t.amber, marginRight: 4 },
    footer: {
      position: "absolute",
      left: 32,
      right: 32,
      bottom: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "Courier",
      fontSize: 7,
      lineHeight: 1,
      color: t.textFaint,
      paddingTop: 6,
      borderTopWidth: 1,
      borderColor: t.borderSoft,
      borderStyle: "solid",
    },
    qrBlock: { flexDirection: "row", alignItems: "center", marginTop: 4 },
    qrImage: { width: 34, height: 34, marginRight: 8, borderRadius: 2 },
    qrLabel: {
      fontFamily: "Courier",
      fontSize: 6.5,
      lineHeight: 1.3,
      color: t.textFaint,
      width: 90,
    },
  });
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
      subject="Currículo — Desenvolvedor Full Stack"
    >
      <Page size="A4" style={s.page}>
        <View style={s.headerRow}>
          <View style={s.headerText}>
            <Text style={s.eyebrow}>anápolis, go — brasil</Text>
            <Text style={s.name}>{profile.name}</Text>
            <Text style={s.role}>
              {profile.role} — Next.js · Fastify · TypeScript
            </Text>
            <Text style={s.contact}>
              {profile.phone} · {profile.email} · linkedin.com
              {profile.linkedinLabel} · github.com{profile.githubLabel} ·{" "}
              {siteDomainLabel}
            </Text>
          </View>
          <View style={s.photoFrame}>
            <Image src={photoDataUrl} style={s.photo} />
          </View>
        </View>

        <Text style={s.summary}>{resumeSummary}</Text>

        <View style={s.stats}>
          {resumeStats.map((stat) => (
            <View key={stat.label} style={s.statBlock}>
              <Text style={s.statNum}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={s.cols}>
          <View style={s.colLeft}>
            <View style={s.sectionTitle}>
              <Text style={s.sectionNum}>01</Text>
              <Text style={s.sectionLabel}>Experiência</Text>
            </View>

            {experience.map((job) => (
              <View key={job.company + job.period} style={s.job} wrap={false}>
                <Text style={s.jobDate}>{job.period}</Text>
                <View style={s.jobTitleRow}>
                  <Text style={s.jobCompany}>{job.company} </Text>
                  <Text style={s.jobRole}>{job.role}</Text>
                </View>
                <Text style={s.jobDesc}>
                  {resumeExperienceOverrides[job.company] ?? job.description}
                </Text>
                <View style={s.tags}>
                  {job.tags.map((tag) => (
                    <Text key={tag} style={s.tag}>
                      {tag}
                    </Text>
                  ))}
                </View>
              </View>
            ))}

            <View style={s.prehist} wrap={false}>
              <Text style={s.jobDate}>{earlierCareer.period}</Text>
              <Text>Antes da tecnologia: {earlierCareer.description}</Text>
            </View>

            <View style={{ marginTop: 11 }}>
              <View style={s.sectionTitle}>
                <Text style={s.sectionNum}>02</Text>
                <Text style={s.sectionLabel}>Projetos em destaque</Text>
              </View>

              {resumeProjects.map((project) => (
                <View key={project.title} style={s.projectItem} wrap={false}>
                  <View style={s.jobTitleRow}>
                    <Text style={s.jobCompany}>{project.title} </Text>
                    <Text style={s.jobRole}>· {project.linkLabel}</Text>
                  </View>
                  <Text style={s.projectDesc}>{project.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={s.colRight}>
            <View style={s.sectionTitle}>
              <Text style={s.sectionNum}>03</Text>
              <Text style={s.sectionLabel}>Stack técnica</Text>
            </View>

            {stackGroups.map((group) => (
              <View key={group.title} style={s.stackGroup} wrap={false}>
                <Text style={s.stackGroupLabel}>{group.title}</Text>
                <View style={s.tags}>
                  {group.items.map((item) => (
                    <Text key={item} style={s.tag}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            ))}

            <View style={s.sideBlock} wrap={false}>
              <View style={s.sectionTitle}>
                <Text style={s.sectionNum}>04</Text>
                <Text style={s.sectionLabel}>Formação</Text>
              </View>
              <Text style={s.sideH3}>{education.degree}</Text>
              <Text style={s.sideSub}>{education.school}</Text>
            </View>

            <View style={s.sideBlock} wrap={false}>
              <View style={s.sectionTitle}>
                <Text style={s.sectionNum}>05</Text>
                <Text style={s.sectionLabel}>Certificações</Text>
              </View>
              {certifications.map((cert) => (
                <View key={cert} style={s.certItem}>
                  <Text style={s.certBullet}>›</Text>
                  <Text>{cert}</Text>
                </View>
              ))}
            </View>

            <View wrap={false}>
              <View style={s.sectionTitle}>
                <Text style={s.sectionNum}>06</Text>
                <Text style={s.sectionLabel}>Disponibilidade</Text>
              </View>
              <Text style={s.sideSub}>{availability}</Text>

              <View style={s.qrBlock}>
                <Image src={qrDataUrl} style={s.qrImage} />
                <Text style={s.qrLabel}>
                  escaneie o QR code pra ver o portfólio atualizado
                </Text>
              </View>
            </View>
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
