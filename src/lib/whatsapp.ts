export const WHATSAPP_NUMBER = "966596222294";
export const WHATSAPP_NUMBER_DISPLAY = "+966 59 622 2294";

export const getWhatsAppUrl = (message?: string) => {
  const defaultMessage = "مرحباً،\nأرغب في التواصل معكم لمعرفة المزيد عن خدماتكم.";
  const msg = message || defaultMessage;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const getProjectWhatsAppUrl = (projectName: string, projectId?: string) => {
  const projectRef = projectId ? `\n(${projectId})` : "";
  const message = `مرحباً،\nأرغب في الاستفسار عن مشروع:\n${projectName}${projectRef}`;
  return getWhatsAppUrl(message);
};
