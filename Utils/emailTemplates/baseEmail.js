const baseEmailTemplate = (mainContent, unsubscribeLink) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="padding: 20px;font-size: 18px;">
        ${mainContent}

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <p style="font-size: 15px; color: #666;">
          If you no longer wish to receive these emails, you can 
          <a href="${unsubscribeLink}" style="color: #f4a4a1; text-decoration: underline;">unsubscribe here</a>.
        </p>

        <p style="margin-top: 20px; color: #999;">
          — The Etabema Cosméticos Team
        </p>
      </div>
    </div>
  `;
};

export default baseEmailTemplate;
