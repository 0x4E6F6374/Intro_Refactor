import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const linkSchema = z.object({
  label: z.string(),
  url: z.string()
})

const socialSchema = linkSchema.extend({
  icon: z.string(),
  url: z.string().optional()
})

export default defineContentConfig({
  collections: {
    profile: defineCollection({
      type: 'data',
      source: 'index.md',
      schema: z.object({
        name: z.string(),
        identity: z.string(),
        headline: z.string(),
        subtitle: z.string(),
        location: z.string(),
        avatars: z.array(z.string()),
        emails: z.array(z.string()),
        socials: z.array(socialSchema)
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.md',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        tech: z.array(z.string()),
        links: z.array(linkSchema),
        date: z.string(),
        status: z.string().optional()
      })
    }),
    timeline: defineCollection({
      type: 'data',
      source: 'timeline.md',
      schema: z.object({
        entries: z.array(z.object({
          date: z.string(),
          event: z.string()
        }))
      })
    }),
    skills: defineCollection({
      type: 'data',
      source: 'skills.md',
      schema: z.object({
        groups: z.array(z.object({
          category: z.string(),
          items: z.array(z.string())
        }))
      })
    }),
    extras: defineCollection({
      type: 'data',
      source: 'extras.md',
      schema: z.object({
        items: z.array(z.object({
          label: z.string(),
          value: z.string()
        }))
      })
    })
  }
})
