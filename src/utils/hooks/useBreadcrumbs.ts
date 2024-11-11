import { useMatches } from "react-router-dom";

export default function useBreadcrumbs() {
  const matches: any = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  return { crumbs };
}
