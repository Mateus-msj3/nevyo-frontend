export interface Dashboard {

  totalPdfs: number;

  totalPagesRead: number;

  totalCompletedBooks: number;

  activeGoals: number;

  storageUsed: string;

  readingStats: { date: string, totalPages: number }[];

  mostReadBooks: { title: string, totalPagesRead: number }[];

  mostReadCategories: { categoryName: string, booksRead: number }[];

  readingActivity: { dayOfWeek: string, totalPages: number }[];

  readingGoalProgress: { goalType: string, goalPages: number, currentProgress: number, progressPercentage: number }[];

}
