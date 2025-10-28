const MinialistTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-7 bg-white text-gray-800 leading-relaxed">
      <header className="text-center mb-1">
        <h1 className="text-3xl font-light" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm text-zinc-600">
          {data.personal_info?.profession || ""}
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 text-gray-600 text-sm">
          {data.personal_info?.email && (
            <a target="_blank" href={`mailto:${data.personal_info?.email}`}>
              <span>{data.personal_info.email}</span>
            </a>
          )}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && (
            <span>{data.personal_info.location}</span>
          )}
          {data.personal_info?.linkedin && (
            <a
              target="_blank"
              href={
                data.personal_info?.linkedin.startsWith("https://")
                  ? data.personal_info?.linkedin
                  : `https://${data.personal_info?.linkedin}`
              }
            >
              <span className="break-all">
                {data.personal_info.linkedin.split("https://")[1]
                  ? data.personal_info.linkedin.split("https://")[1]
                  : data.personal_info.linkedin}
              </span>
            </a>
          )}
          {data.personal_info?.github && (
            <a
              target="_blank"
              href={
                data.personal_info?.github.startsWith("https://")
                  ? data.personal_info?.github
                  : `https://${data.personal_info?.github}`
              }
            >
              <span className="break-all">
                {data.personal_info.github.split("https://")[1]
                  ? data.personal_info.github.split("https://")[1]
                  : data.personal_info.github}
              </span>
            </a>
          )}
          {data.personal_info?.website && (
            <a
              target="_blank"
              href={
                data.personal_info?.website.startsWith("https://")
                  ? data.personal_info?.website
                  : `https://${data.personal_info?.website}`
              }
            >
              <span className="break-all">
                {data.personal_info.website.split("https://")[1]
                  ? data.personal_info.website.split("https://")[1]
                  : data.personal_info.website}
              </span>
            </a>
          )}
        </div>
      </header>

      <section className="mb-2">
        {data.professional_summary && (
          <>
            <h2
              className="text-sm font-semibold uppercase"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.professional_summary}</p>
          </>
        )}
      </section>

      {data.experience && data.experience.length > 0 && (
        <section className="mb-2">
          <h2
            className="text-sm font-semibold uppercase"
            style={{ color: accentColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-1">
            {data.experience.map((exp, idx) => (
              <div>
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-gray-600 text-sm">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.project && data.project.length > 0 && (
        <section className="mb-2">
          <h2
            className="text-sm font-semibold uppercase"
            style={{ color: accentColor }}
          >
            Projects
          </h2>
          <ul className="space-y-1">
            {data.project.map((p, i) => (
              <li key={i}>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-600">{p.description}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="mb-2">
          <h2
            className="text-sm font-semibold uppercase"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-1">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start">
                <div>
                  <div className="font-medium">
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </div>
                  <div className="text-sm text-gray-600">{edu.institution}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-sm font-semibold uppercase"
            style={{ color: accentColor }}
          >
            Core Skills
          </h2>
          <div className="flex flex-wrap gap-1.5 text-sm text-gray-700">
            {data.skills.map((s, idx) => (
              <div key={idx} className="px-2 py-0.5 border rounded">
                {s}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinialistTemplate;
