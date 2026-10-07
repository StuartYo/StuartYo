import { json, route } from "@/lib/http";
import { computeWeights, getDepartments } from "@/lib/scoring";

export const GET = route(async () => {
  const depts = (await getDepartments()).filter((d) => d.enabled);
  const { weights } = computeWeights(depts);
  return json(
    depts.map((d) => ({
      id: d.id,
      college: d.college,
      name: d.name,
      short: d.short,
      kind: d.kind,
      students: d.students,
      weight: weights.get(d.id),
    })),
  );
});
