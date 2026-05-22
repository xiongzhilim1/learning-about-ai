import { useEffect } from "react";

const SITE_NAME = "Sean Lim";

export function useTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} | ${SITE_NAME}` : SITE_NAME;
  }, [page]);
}
