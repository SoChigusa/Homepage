import createHeaderData from "../utils/createHeaderData";
import extractTalkData from "../utils/extractTalkData";
import compileCV from "../utils/compileCV";
import useLocale from "../utils/useLocale";
import ArticlesMeta from "../components/meta/articles";
import CVTable from "../components/CVTable";
import Link from "../components/Link";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Article, List } from "@mui/icons-material";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  const talk_list: TalkList = await extractTalkData({});
  const personalInfo: PersonalInfo = compileCV({ talk_list: talk_list });
  return { props: { headerData, personalInfo, }, };
};

const createData = (name: string, content: string): CVTableData => {
  return { name: name, content: content };
};

const cv = ({ personalInfo }: { personalInfo: PersonalInfo }) => {
  const { t } = useLocale();
  const rows_personal_data_1: CVTableData[] = [
    createData(t.NAME_FIRST, t.NAME_FIRST_CONTENT),
    createData(t.NAME_SECOND, t.NAME_SECOND_CONTENT),
    createData(t.DATE_OF_BIRTH, t.DATE_OF_BIRTH_CONTENT),
    createData(t.PLACE_OF_BIRTH, t.PLACE_OF_BIRTH_CONTENT),
    createData(t.NATIONALITY, t.NATIONALITY_CONTENT),
    createData(t.AGE, personalInfo.age.toString()),
    createData(t.SEX, t.SEX_CONTENT),
  ];
  const rows_personal_data_2: CVTableData[] = [
    createData(t.AFFILIATION, t.AFFILIATION_CONTENT),
    createData(t.POSTCODE, '02139-4301'),
    createData(t.ADDRESS, '77 Massachusetts Avenue, Cambridge, MA'),
    createData(t.PHONE, '+1-617-253-4800'),
    createData(t.EMAIL, 'schigusa[at]mit.edu'),
    createData(t.WEBPAGE, 'https://website-sochigusa.vercel.app/'),
  ];
  const rows_education: CVTableData[] = [
    createData(t.EDUCATION_DOCTOR_DATE, t.EDUCATION_DOCTOR),
    createData(t.EDUCATION_MASTER_DATE, t.EDUCATION_MASTER),
    createData(t.EDUCATION_BACHELOR_DATE, t.EDUCATION_BACHELOR),
  ];
  const rows_professional_experience: CVTableData[] = [
    createData(t.PE_4_DATE, t.PE_4_CONTENT),
    createData(t.PE_3_DATE, t.PE_3_CONTENT),
    createData(t.PE_2_DATE, t.PE_2_CONTENT),
    createData(t.PE_1_DATE, t.PE_1_CONTENT),
  ];
  const rows_teaching_experience: CVTableData[] = [
    createData(t.TE_1_DATE, t.TE_1_CONTENT),
  ];
  const rows_grants: CVTableData[] = [
    createData(t.GRANT_1_DATE, t.GRANT_1_CONTENT),
    createData(t.GRANT_2_DATE, t.GRANT_2_CONTENT),
    createData(t.GRANT_3_DATE, t.GRANT_3_CONTENT),
  ];
  const rows_honors_and_awards: CVTableData[] = [
    createData('1.', t.HA_1_CONTENT),
    createData('2.', t.HA_2_CONTENT),
  ];

  return (
    <>
      <ArticlesMeta
        title={t.CV_TITLE}
        description={t.CV_DESCRIPTION}
        url="/cv"
        img=""
      />
      <Stack spacing={2} direction="column">
        <Grid container spacing={2}>
          <CVTable title={t.PERSONAL_DATA} rows={rows_personal_data_1} />
          <CVTable rows={rows_personal_data_2} />
          <CVTable title={t.EDUCATION} rows={rows_education} />
          <CVTable title={t.PROFESSIONAL_EXPERIENCES} rows={rows_professional_experience} />
          <CVTable title={t.TEACHING_EXPERIENCES} rows={rows_teaching_experience} />
          <CVTable title={t.GRANTS} rows={rows_grants} />
          <CVTable title={t.HONORS_AND_AWARDS} rows={rows_honors_and_awards} />
          <Grid item xs={12} md={6}>
            <Typography gutterBottom variant="h5">
              {t.RESEARCH_ACHIEVEMENTS}
            </Typography>
            <Link href="./research">
              <Button variant="outlined" startIcon={<List />}>
                {t.SEE_RESEARCH_ACTIVITIES}
              </Button>
            </Link >
          </Grid>
        </Grid>
        <Link href="../cv.pdf">
          <Button variant="outlined" startIcon={<Article />}>
            {t.OPEN_CV_PDF}
          </Button>
        </Link>
      </Stack>
    </>
  )
};

export default cv;