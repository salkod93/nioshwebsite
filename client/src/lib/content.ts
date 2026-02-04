export type Language = 'en' | 'ar';

export const content = {
  en: {
    nav: {
      home: "Home",
      about: "About the Institute",
      aboutDropdown: {
        overview: "About the Institute",
        ceoMessage: "CEO's Message",
        boardMembers: "Board of Directors",
        boardRoles: "Board Roles and Powers",
        strategy: "Strategic Direction"
      },
      priorities: "Strategic Priorities",
      services: "Services & Products",
      servicesDropdown: {
        training: "Training Services",
        consultancy: "Consultancy Services",
        wellness: "Occupational Wellness Center",
        other: "Other Services"
      },
      mediaCenter: "Media Center",
      mediaCenterDropdown: {
        news: "News",
        reports: "Reports",
        videoGallery: "Video Gallery",
        photoGallery: "Photo Gallery",
        digitalLibrary: "Digital Library"
      },
      contact: "Contact Us",
      langSwitch: "العربية"
    },
    hero: {
      title: "",
      subtitle: "Providing an integrated national system for occupational safety and health services to act as a reference for enabling capabilities and enhancing a safe and sustainable work environment in the Kingdom of Saudi Arabia.",
      cta: "Explore Our Services"
    },
    about: {
      title: "About NIOSH",
      description: [
        "The National Institute for Occupational Safety and Health is the executive arm of the National Council for Occupational Safety and Health. It was established in 2024 to be the first national reference for qualifying competencies, developing policies, and promoting innovation in the field of occupational safety and health.",
        "The Institute's establishment came in response to the economic and social transformations witnessed by the Saudi labor market, with the significant expansion in the number of establishments and workers, and the increasing need for safe and healthy work environments.",
        "The Institute aims to be the national reference in building capabilities, developing knowledge, and standardizing practices in the field of occupational safety and health, in a way that enhances the quality of the work environment and supports sustainable development."
      ],
      mission: {
        title: "Our Mission",
        text: "Empowering the occupational safety and health system by spreading the culture, building capacities, and providing advanced training, consulting, and technical services, to achieve a safe and attractive work environment."
      },
      vision: {
        title: "Our Vision",
        text: "Global leadership towards enabling an integrated national system for occupational safety and health."
      }
    },
    priorities: {
      title: "Strategic Priorities",
      items: [
        {
          title: "Develop specialized national capabilities",
          description: "Qualify national competencies according to specialized and accredited training and qualification programs."
        },
        {
          title: "Build a national technical reference",
          description: "Provide operational models and technical frameworks that support regulatory bodies."
        },
        {
          title: "Provide consulting services",
          description: "Provide specialized consulting and technical services in the field of occupational safety and health."
        },
        {
          title: "Enable research and innovation",
          description: "Conduct research for practical, implementable solutions and provide specialized consultations."
        },
        {
          title: "Conclude agreements and partnerships",
          description: "Build a network of local and international partnerships with the aim of enhancing technical implementation."
        },
        {
          title: "Spread institutional and community awareness",
          description: "Design and implement professional and community awareness campaigns."
        },
        {
          title: "Develop the digital infrastructure in the field of OSH",
          description: "Operate digital platforms to provide the institute's services nationally and locally."
        },
        {
          title: "Align practices with international standards",
          description: "Provide studies and technical recommendations to update regulatory frameworks."
        }
      ]
    },
    services: {
      title: "Services & Products",
      categories: {
        consultancy: {
          title: "Consultancy Services",
          description: "Expert guidance and advisory services to help organizations maintain high safety standards.",
          items: [
            {
              title: "Consultancy Services",
              description: "Expert guidance and advisory services to help organizations maintain high safety standards.",
              tags: ["government", "works"],
              buttonText: "Start the service"
            },
            {
              title: "Assessment/Audit/Compliance",
              description: "Rigorous assessment and auditing services to ensure full compliance with safety regulations.",
              tags: ["government", "works"],
              buttonText: "Start the service"
            },
            {
              title: "Research and Innovation Services",
              description: "Supporting research initiatives to drive innovation in occupational safety and health.",
              tags: ["government", "works"],
              buttonText: "Start the service"
            }
          ]
        },
        training: {
          title: "Training Services",
          description: "Comprehensive training programs designed for individuals and institutions.",
          items: [
            {
              title: "Entry-level Employment Training",
              description: "Comprehensive training programs designed for new employees to ensure foundational safety knowledge.",
              tags: ["individuals", "works"],
              buttonText: "Start the service"
            },
            {
              title: "Institutional Qualification and Training Services",
              description: "Specialized programs for qualifying institutions and enhancing their safety protocols.",
              tags: ["government", "works"],
              buttonText: "Start the service"
            },
            {
              title: "Kawader Product",
              description: "Specialized training product for developing safety cadres.",
              tags: ["individuals", "works"],
              buttonText: "Start the service"
            },
            {
              title: "Investigators Product",
              description: "Advanced training for safety incident investigators.",
              tags: ["government", "works"],
              buttonText: "Start the service"
            },
            {
              title: "High Risk Jobs Product",
              description: "Specialized training for high-risk occupational roles.",
              tags: ["works"],
              buttonText: "Start the service"
            }
          ]
        },
        wellness: {
          title: "Occupational Wellness Center",
          description: "Promoting holistic well-being and health in the workplace.",
          items: [
            {
              title: "Wellness Programs",
              description: "Comprehensive programs to enhance employee well-being.",
              tags: ["works", "government"],
              buttonText: "Start the service"
            },
            {
              title: "Health Assessments",
              description: "Professional health assessments for workplace safety.",
              tags: ["individuals", "works"],
              buttonText: "Start the service"
            }
          ]
        },
        other: {
          title: "Other Services",
          description: "A wide range of additional services including certification, membership, and events.",
          items: [
            {
              title: "Issuance of Certificates and Renewals",
              description: "Official certification services for individuals and organizations meeting safety standards.",
              tags: ["individuals", "works"],
              buttonText: "Start the service"
            },
            {
              title: "Professional Membership",
              description: "Membership programs offering exclusive resources, networking, and professional development.",
              tags: ["individuals"],
              buttonText: "Start the service"
            },
            {
              title: "Conferences and Exhibitions",
              description: "Organizing and hosting major events to promote safety awareness and industry innovation.",
              tags: ["government", "individuals"],
              buttonText: "Start the service"
            },
            {
              title: "Content Sales and Publications",
              description: "Access to a wide range of educational materials, guides, and industry publications.",
              tags: ["individuals", "works"],
              buttonText: "Start the service"
            }
          ]
        }
      }
    },
    mediaCenter: {
      title: "Media Center",
      items: [
        {
          title: "News",
          description: "Latest updates and announcements from NIOSH.",
          icon: "Newspaper"
        },
        {
          title: "Reports",
          description: "In-depth reports and analysis on occupational safety.",
          icon: "FileText"
        },
        {
          title: "Video Gallery",
          description: "Watch our latest videos and event highlights.",
          icon: "Video"
        },
        {
          title: "Photo Gallery",
          description: "Browse photos from our events and activities.",
          icon: "Image"
        },
        {
          title: "Digital Library",
          description: "Access our comprehensive collection of digital resources.",
          icon: "Library"
        }
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with us for any inquiries or support.",
      address: {
        label: "Address",
        value: "Riyadh, Kingdom of Saudi Arabia"
      },
      email: {
        label: "Email",
        value: "info@niosh.sa"
      },
      phone: {
        label: "Phone",
        value: "+966 11 000 0000"
      }
    },
    footer: {
      copyright: "© 2026 National Institute for Occupational Safety and Health. All rights reserved.",
      address: "Riyadh, Kingdom of Saudi Arabia"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن المعهد",
      aboutDropdown: {
        overview: "نبذة عن المعهد",
        ceoMessage: "كلمة الرئيس التنفيذي",
        boardMembers: "أعضاء مجلس الإدارة",
        boardRoles: "أدوار وصلاحيات المجلس",
        strategy: "التوجه الاستراتيجي"
      },
      priorities: "الأولويات الاستراتيجية",
      services: "الخدمات والمنتجات",
      servicesDropdown: {
        training: "خدمات التدريب",
        consultancy: "خدمات استشارية",
        wellness: "مركز الرفاه المهني",
        other: "خدمات أخرى"
      },
      mediaCenter: "المركز الإعلامي",
      mediaCenterDropdown: {
        news: "الأخبار",
        reports: "التقارير",
        videoGallery: "مكتبة الفيديو",
        photoGallery: "مكتبة الصور",
        digitalLibrary: "المكتبة الرقمية"
      },
      contact: "تواصل معنا",
      langSwitch: "English"
    },
    hero: {
      title: "",
      subtitle: "توفير منظومة وطنية متكاملة لخدمات السلامة والصحة المهنية لتكون مرجعاً لتمكين القدرات وتعزيز بيئة عمل آمنة ومستدامة في المملكة العربية السعودية.",
      cta: "استكشف خدماتنا"
    },
    about: {
      title: "عن المعهد",
      description: [
        "المعهد الوطني للسلامة والصحة المهنية هو الذراع التنفيذي للمجلس الوطني للسلامة والصحة المهنية. تأسس عام 2024 ليكون المرجع الوطني الأول لتأهيل الكفاءات وتطوير السياسات وتعزيز الابتكار في مجال السلامة والصحة المهنية.",
        "جاء تأسيس المعهد استجابة للتحولات الاقتصادية والاجتماعية التي يشهدها سوق العمل السعودي، مع التوسع الكبير في أعداد المنشآت والعاملين، والحاجة المتزايدة لبيئات عمل آمنة وصحية.",
        "يهدف المعهد إلى أن يكون المرجع الوطني في بناء القدرات وتطوير المعرفة وتوحيد الممارسات في مجال السلامة والصحة المهنية، بما يعزز جودة بيئة العمل ويدعم التنمية المستدامة."
      ],
      mission: {
        title: "رسالتنا",
        text: "تمكين منظومة السلامة والصحة المهنية من خلال نشر الثقافة وبناء القدرات وتقديم خدمات تدريبية واستشارية وفنية متقدمة، لتحقيق بيئة عمل آمنة وجاذبة."
      },
      vision: {
        title: "رؤيتنا",
        text: "الريادة العالمية نحو تمكين نظام وطني متكامل للسلامة والصحة المهنية."
      }
    },
    priorities: {
      title: "الأولويات الاستراتيجية",
      items: [
        {
          title: "تطوير القدرات الوطنية المتخصصة",
          description: "تأهيل الكفاءات الوطنية وفق برامج تدريب وتأهيل متخصصة ومعتمدة."
        },
        {
          title: "بناء مرجع فني وطني",
          description: "توفير نماذج تشغيلية وأطر فنية تدعم الجهات التنظيمية."
        },
        {
          title: "تقديم الخدمات الاستشارية",
          description: "تقديم خدمات استشارية وفنية متخصصة في مجال السلامة والصحة المهنية."
        },
        {
          title: "تمكين البحث والابتكار",
          description: "إجراء أبحاث لحلول عملية قابلة للتطبيق وتقديم استشارات متخصصة."
        },
        {
          title: "إبرام الاتفاقيات والشراكات",
          description: "بناء شبكة من الشراكات المحلية والدولية بهدف تعزيز التنفيذ الفني."
        },
        {
          title: "نشر الوعي المؤسسي والمجتمعي",
          description: "تصميم وتنفيذ حملات توعية مهنية ومجتمعية."
        },
        {
          title: "تطوير البنية التحتية الرقمية في مجال السلامة والصحة المهنية",
          description: "تشغيل منصات رقمية لتقديم خدمات المعهد وطنياً ومحلياً."
        },
        {
          title: "مواءمة الممارسات مع المعايير الدولية",
          description: "تقديم دراسات وتوصيات فنية لتحديث الأطر التنظيمية."
        }
      ]
    },
    services: {
      title: "الخدمات والمنتجات",
      categories: {
        consultancy: {
          title: "خدمات استشارية",
          description: "توجيهات الخبراء والخدمات الاستشارية لمساعدة المؤسسات في الحفاظ على معايير سلامة عالية.",
          items: [
            {
              title: "خدمات استشارية",
              description: "توجيهات الخبراء والخدمات الاستشارية لمساعدة المؤسسات في الحفاظ على معايير سلامة عالية.",
              tags: ["حكومي", "أعمال"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "تقييم/تدقيق/امتثال",
              description: "خدمات تقييم وتدقيق صارمة لضمان الامتثال الكامل للوائح السلامة.",
              tags: ["حكومي", "أعمال"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "خدمات البحث والابتكار",
              description: "دعم المبادرات البحثية لدفع الابتكار في مجال السلامة والصحة المهنية.",
              tags: ["حكومي", "أعمال"],
              buttonText: "ابدأ الخدمة"
            }
          ]
        },
        training: {
          title: "خدمات التدريب",
          description: "برامج تدريبية شاملة مصممة للأفراد والمؤسسات.",
          items: [
            {
              title: "التدريب المبتدئ بالتوظيف",
              description: "برامج تدريبية شاملة مصممة للموظفين الجدد لضمان المعرفة الأساسية بالسلامة.",
              tags: ["أفراد", "أعمال"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "خدمات التأهيل والتدريب المؤسسي",
              description: "برامج متخصصة لتأهيل المؤسسات وتعزيز بروتوكولات السلامة لديها.",
              tags: ["حكومي", "أعمال"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "منتج كوادر",
              description: "منتج تدريبي متخصص لتطوير كوادر السلامة.",
              tags: ["أفراد", "أعمال"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "منتج المحققون",
              description: "تدريب متقدم لمحققي حوادث السلامة.",
              tags: ["حكومي", "أعمال"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "منتج مهن ذات المخاطر العالية",
              description: "تدريب متخصص للمهن ذات المخاطر العالية.",
              tags: ["أعمال"],
              buttonText: "ابدأ الخدمة"
            }
          ]
        },
        wellness: {
          title: "مركز الرفاه المهني",
          description: "تعزيز الرفاهية والصحة الشاملة في مكان العمل.",
          items: [
            {
              title: "برامج الرفاهية",
              description: "برامج شاملة لتعزيز رفاهية الموظفين.",
              tags: ["أعمال", "حكومي"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "التقييمات الصحية",
              description: "تقييمات صحية مهنية لسلامة مكان العمل.",
              tags: ["أفراد", "أعمال"],
              buttonText: "ابدأ الخدمة"
            }
          ]
        },
        other: {
          title: "خدمات أخرى",
          description: "مجموعة واسعة من الخدمات الإضافية بما في ذلك الشهادات والعضوية والفعاليات.",
          items: [
            {
              title: "اصدار الشهادات والتجديد",
              description: "خدمات إصدار الشهادات الرسمية للأفراد والمؤسسات التي تستوفي معايير السلامة.",
              tags: ["أفراد", "أعمال"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "العضوية المهنية",
              description: "برامج عضوية تقدم موارد حصرية، وفرص للتواصل، وتطوير مهني.",
              tags: ["أفراد"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "المؤتمرات والمعارض",
              description: "تنظيم واستضافة الفعاليات الكبرى لتعزيز الوعي بالسلامة والابتكار في الصناعة.",
              tags: ["حكومي", "أفراد"],
              buttonText: "ابدأ الخدمة"
            },
            {
              title: "بيع المحتوى والمطبوعات",
              description: "الوصول إلى مجموعة واسعة من المواد التعليمية والأدلة والمنشورات الصناعية.",
              tags: ["أفراد", "أعمال"],
              buttonText: "ابدأ الخدمة"
            }
          ]
        }
      }
    },
    mediaCenter: {
      title: "المركز الإعلامي",
      items: [
        {
          title: "الأخبار",
          description: "آخر التحديثات والإعلانات من المعهد.",
          icon: "Newspaper"
        },
        {
          title: "التقارير",
          description: "تقارير وتحليلات متعمقة حول السلامة المهنية.",
          icon: "FileText"
        },
        {
          title: "مكتبة الفيديو",
          description: "شاهد أحدث مقاطع الفيديو وأبرز الفعاليات.",
          icon: "Video"
        },
        {
          title: "مكتبة الصور",
          description: "تصفح صور فعالياتنا وأنشطتنا.",
          icon: "Image"
        },
        {
          title: "المكتبة الرقمية",
          description: "الوصول إلى مجموعتنا الشاملة من الموارد الرقمية.",
          icon: "Library"
        }
      ]
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "تواصل معنا لأي استفسارات أو دعم.",
      address: {
        label: "العنوان",
        value: "الرياض، المملكة العربية السعودية"
      },
      email: {
        label: "البريد الإلكتروني",
        value: "info@niosh.sa"
      },
      phone: {
        label: "الهاتف",
        value: "+966 11 000 0000"
      }
    },
    footer: {
      copyright: "© 2026 المعهد الوطني للسلامة والصحة المهنية. جميع الحقوق محفوظة.",
      address: "الرياض، المملكة العربية السعودية"
    }
  }
};
