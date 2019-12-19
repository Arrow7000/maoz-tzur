interface ContentVersions {
  ashkenaz: string[];
  sefardi: string[];
}

type Nusach = keyof ContentVersions;

interface AllContent {
  all: string[];
}

interface TextSubsection {
  title?: string;
  texts: ContentVersions | AllContent;
}

interface ContentSection {
  title: string;
  subtitle: string;
  content: TextSubsection[];
}

type Setter<T> = (t: T) => void;

interface Option<T> {
  label: string;
  value: T;
}
