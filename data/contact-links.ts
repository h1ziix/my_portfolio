/** Replace a placeholder with the full profile URL to enable its contact link. */
export const additionalContactLinks = [
  { label: "Upwork", href: "{{UPWORK_URL}}" },
  { label: "LinkedIn", href: "{{LINKEDIN_URL}}" }
] as const;
