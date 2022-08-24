import { Injectable } from '@angular/core';
import { UserService } from '@app/core';
import { BehaviorSubject, Subscription, takeUntil, takeWhile, tap, timer } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    public timerSubject$ = new BehaviorSubject<number>(0);

    public timerValue$ = this.timerSubject$.asObservable();

    constructor(private userService: UserService) {}

    private set timerValue(timerValue: number) {
        this.timerSubject$.next(timerValue);
    }

    timer(counter: number, interval: number, func: () => void): Subscription {
        let timeLast = counter;
        const obs = timer(0, interval).pipe(
            takeWhile(() => timeLast > 0),
            tap(() => (timeLast -= 1))
        );

        return obs.pipe(takeUntil(this.userService.unsubscribeOnSignout$)).subscribe(() => {
            if (timeLast === 0) func();
            return (this.timerValue = timeLast);
        });
    }
}
